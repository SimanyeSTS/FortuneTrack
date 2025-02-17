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

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePrediction = async (req, res) => {
  try {
    const { message, companyData } = req.body;
    
    if (!companyData || !companyData.Name || !companyData.Symbol) {
      return res.status(400).json({ 
        error: 'Invalid request: Company name and symbol are required' 
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Server configuration error: API key not found' 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    let historicalMetrics = '';
    historicalMetrics += companyData['52WeekHigh'] || companyData['Week52High'] 
      ? `\n    - 52 Week High: ${companyData['52WeekHigh'] || companyData['Week52High']}`
      : '';
    
    historicalMetrics += companyData['52WeekLow'] || companyData['Week52Low']
      ? `\n    - 52 Week Low: ${companyData['52WeekLow'] || companyData['Week52Low']}`
      : '';
    
    const movingAverage50 = companyData['50DayMovingAverage'] || companyData['Day50MovingAverage'];
    const movingAverage200 = companyData['200DayMovingAverage'] || companyData['Day200MovingAverage'];
    
    if (movingAverage50) {
      historicalMetrics += `\n    - Moving Averages: 50-Day: ${movingAverage50}`;
      if (movingAverage200) {
        historicalMetrics += `, 200-Day: ${movingAverage200}`;
      }
    }

    const prompt = `As a financial analyst, analyze this company data and ${message}:
    
    Company: ${companyData.Name} (${companyData.Symbol})
    Sector: ${companyData.Sector}
    Industry: ${companyData.Industry}
    
    Key Metrics (Latest Quarter):
    - Market Cap: ${companyData.MarketCapitalization}
    - PE Ratio: ${companyData.PERatio}
    - Revenue Growth (YoY): ${companyData.QuarterlyRevenueGrowthYOY}
    - Profit Margin: ${companyData.ProfitMargin}
    - Analyst Target Price: ${companyData.AnalystTargetPrice}
    - Quarterly Earnings Growth YoY: ${companyData.QuarterlyEarningsGrowthYOY}
    
    Historical Metrics: ${historicalMetrics}
    
    Please provide detailed analysis and forecasting based on these metrics, with emphasis on future market trends and stock price predictions.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ response: text });
  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(408).json({ 
        error: 'Request timeout: The analysis took too long to complete' 
      });
    }
    
    if (error.name === 'QuotaExceededError') {
      return res.status(429).json({ 
        error: 'API quota exceeded. Please try again later' 
      });
    }

    return res.status(500).json({ 
      error: 'An error occurred while generating the prediction' 
    });
  }
};

export default { 
  generatePrediction 
};