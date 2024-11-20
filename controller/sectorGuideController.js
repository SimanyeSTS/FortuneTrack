import { GoogleGenerativeAI } from "@google/generative-ai";

class SectorGuideController {
  constructor() {
    // Ensure you have set GEMINI_API_KEY in your environment variables
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY must be set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async getInsights(req, res) {
    try {
      const { message, sectors } = req.body;
      // Prepare sector summary data
      const sectorSummaries = {
        retail: this.summarizeSector(sectors.retail),
        technology: this.summarizeSector(sectors.technology),
        foodAndBeverages: this.summarizeSector(sectors.foodAndBeverages),
        healthcare: this.summarizeSector(sectors.healthcare),
      };
      const response = await this.generateResponse(message, sectorSummaries);
      res.json({ response });
    } catch (error) {
      console.error('Sector Guide Error:', error);
      res.status(500).json({ error: 'Failed to generate sector insights.' });
    }
  }

  summarizeSector(companies) {
    if (!companies || companies.length === 0) return null;
    const avgGrowth =
      companies.reduce(
        (sum, company) => sum + (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0),
        0
      ) / companies.length;
    const topPerformer = companies.reduce(
      (top, company) =>
        (parseFloat(company.QuarterlyEarningsGrowthYOY) || 0) >
        (parseFloat(top.QuarterlyEarningsGrowthYOY) || 0)
          ? company
          : top,
      companies[0]
    );
    return {
      companyCount: companies.length,
      averageGrowth: avgGrowth.toFixed(2),
      topPerformer: topPerformer.Symbol,
      topPerformerGrowth: topPerformer.QuarterlyEarningsGrowthYOY,
    };
  }

  async generateResponse(message, sectorSummaries) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a helpful assistant that provides friendly, conversational insights about market sectors. 
    Do not make specific predictions or give financial advice. Keep the tone light, engaging, and concise.

    Generate a friendly, conversational response about market sectors. Here is the user question and the available sector information:

    Question: ${message}

    Available sector information:
    ${JSON.stringify(sectorSummaries, null, 2)}

    Remember:
    - Compare sectors when relevant.
    - Encourage using the Predict button for detailed analysis.
    - Keep responses concise and easy to understand.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini AI API Error:', error.message);
      throw new Error('Failed to generate response from Gemini AI.');
    }
  }
}

export default new SectorGuideController();