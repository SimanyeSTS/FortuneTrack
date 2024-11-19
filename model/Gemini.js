import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class Gemini {
  static async generatePrediction(message, companyData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Create a comprehensive prompt that includes company data context
      const prompt = `As a financial analyst, analyze this company data and ${message}:
      
      Company: ${companyData.Name} (${companyData.Symbol})
      Sector: ${companyData.Sector}
      Industry: ${companyData.Industry}
      
      Key Metrics:
      - Market Cap: ${companyData.MarketCapitalization}
      - PE Ratio: ${companyData.PERatio}
      - Revenue Growth: ${companyData.QuarterlyRevenueGrowthYOY}
      - Profit Margin: ${companyData.ProfitMargin}
      - Analyst Target Price: ${companyData.AnalystTargetPrice}
      
      Please provide detailed analysis and forecasting based on these metrics.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Failed to generate prediction: ${error.message}`);
    }
  }
}

export default Gemini;