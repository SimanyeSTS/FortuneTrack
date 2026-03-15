// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
// });

// class SectorGuideController {
//   async getInsights(req, res) {
//     try {
//       const { message, sectors } = req.body;

//       // Prepare sector summary data
//       const sectorSummaries = {
//         retail: this.summarizeSector(sectors.retail),
//         technology: this.summarizeSector(sectors.technology),
//         foodAndBeverages: this.summarizeSector(sectors.foodAndBeverages),
//         healthcare: this.summarizeSector(sectors.healthcare),
//       };

//       const response = await this.generateResponse(message, sectorSummaries);
//       res.json({ response });
//     } catch (error) {
//       console.error('Sector Guide Error:', error);
//       res.status(500).json({ error: 'Failed to generate sector insights.' });
//     }
//   }

//   summarizeSector(companies) {
//     if (!companies || companies.length === 0) return null;

//     const avgGrowth =
//       companies.reduce(
//         (sum, company) => sum + (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0),
//         0
//       ) / companies.length;

//     const topPerformer = companies.reduce(
//       (top, company) =>
//         (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0) >
//         (parseFloat(top.QuarterlyEarningsGrowthYOY) || 0)
//           ? company
//           : top,
//       companies[0]
//     );

//     return {
//       companyCount: companies.length,
//       averageGrowth: avgGrowth.toFixed(2),
//       topPerformer: topPerformer.Symbol,
//       topPerformerGrowth: topPerformer.QuarterlyEarningsGrowthYOY,
//     };
//   }

//   async generateResponse(message, sectorSummaries) {
//     const messages = [
//       {
//         role: 'system',
//         content:
//           'You are a helpful assistant that provides friendly, conversational insights about market sectors. Do not make specific predictions or give financial advice. Keep the tone light, engaging, and concise.',
//       },
//       {
//         role: 'user',
//         content: `Generate a friendly, conversational response about market sectors. Here is the user question and the available sector information:\n
//         Question: ${message}\n\n
//         Available sector information:\n${JSON.stringify(sectorSummaries, null, 2)}\n\n
//         Remember:
//         - Compare sectors when relevant.
//         - Encourage using the Predict button for detailed analysis.
//         - Keep responses concise and easy to understand.`,
//       },
//     ];
  
//     try {
//       const completion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo', // Use gpt-3.5-turbo for broader compatibility
//         messages,
//         max_tokens: 500,
//         temperature: 0.7,
//       });
  
//       return completion.choices[0]?.message?.content?.trim();
//     } catch (error) {
//       console.error('OpenAI API Error:', error.message);
//       if (error.response?.data?.error?.code === 'model_not_found') {
//         throw new Error('The requested model is not available for your API key. Please check your OpenAI subscription.');
//       }
//       throw new Error('Failed to generate response from OpenAI.');
//     }
//   }
// }

// export default new SectorGuideController();

import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-3-flash-preview';

const isQuotaError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  return (
    error?.name === 'QuotaExceededError' ||
    message.includes('quota') ||
    message.includes('resource_exhausted') ||
    message.includes('"code":429') ||
    message.includes('429')
  );
};

class SectorGuideController {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY must be set in environment variables');
    }
    this.genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async getInsights(req, res) {
    try {
      const { message, sectors } = req.body;

      if (!message || !sectors) {
        return res.status(400).json({
          error: 'Message and sectors data are required'
        });
      }

      const requiredSectors = ['retail', 'technology', 'foodAndBeverages', 'healthcare'];
      const missingSectors = requiredSectors.filter(sector => !sectors[sector]);

      if (missingSectors.length > 0) {
        return res.status(400).json({
          error: `Missing sector data for: ${missingSectors.join(', ')}`
        });
      }

      const sectorSummaries = {
        retail: this.summarizeSector(sectors.retail),
        technology: this.summarizeSector(sectors.technology),
        foodAndBeverages: this.summarizeSector(sectors.foodAndBeverages),
        healthcare: this.summarizeSector(sectors.healthcare),
      };

      const invalidSectors = Object.entries(sectorSummaries)
        .filter(([_, summary]) => summary === null)
        .map(([sector]) => sector);

      if (invalidSectors.length > 0) {
        return res.status(400).json({
          error: `Invalid company data for sectors: ${invalidSectors.join(', ')}`
        });
      }

      const response = await this.generateResponse(message, sectorSummaries);
      return res.json({ response });
    } catch (error) {
      if (error.message.includes('GEMINI_API_KEY')) {
        return res.status(500).json({
          error: 'Server configuration error'
        });
      }

      return res.status(500).json({
        error: 'Failed to generate sector insights'
      });
    }
  }

  summarizeSector(companies) {
    try {
      if (!Array.isArray(companies) || companies.length === 0) {
        return null;
      }

      const validCompanies = companies.filter(company =>
        company &&
        typeof company === 'object' &&
        'QuarterlyEarningsGrowthYOY' in company &&
        'Symbol' in company
      );

      if (validCompanies.length === 0) {
        return null;
      }

      const avgGrowth = validCompanies.reduce(
        (sum, company) => sum + (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0),
        0
      ) / validCompanies.length;

      const topPerformer = validCompanies.reduce(
        (top, company) =>
          (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0) >
          (parseFloat(top.QuarterlyEarningsGrowthYOY) || 0)
            ? company
            : top,
        validCompanies[0]
      );

      return {
        companyCount: validCompanies.length,
        averageGrowth: avgGrowth.toFixed(2),
        topPerformer: topPerformer.Symbol,
        topPerformerGrowth: topPerformer.QuarterlyEarningsGrowthYOY,
      };
    } catch (error) {
      return null;
    }
  }

  async generateResponse(message, sectorSummaries) {
    const prompt = `You are a helpful assistant that provides friendly, conversational insights about market sectors. Do not make specific predictions or give financial advice. Keep the tone light, engaging, and concise.

    Generate a friendly, conversational response about market sectors. Here is the user question and the available sector information:

    Question: ${message}

    Available sector information:
    ${JSON.stringify(sectorSummaries, null, 2)}

    Remember:
    - Compare sectors when relevant.
    - Encourage using the Predict button for detailed analysis.
    - Keep responses concise and easy to understand.`;

    try {
      const response = await this.genAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt
      });

      const text = response?.text;

      if (!text) {
        throw new Error('Empty response from AI model');
      }

      return text.trim();
    } catch (error) {
      if (isQuotaError(error)) {
        throw new Error('API quota exceeded');
      }
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw new Error(`Failed to generate AI response: ${error.message}`);
    }
  }
}

export default new SectorGuideController();