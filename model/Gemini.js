import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class Gemini {
  static async generatePrediction(message, companyData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      let historicalMetrics = ''
      if (companyData['52WeekHigh']) {
        historicalMetrics += `\n      - 52 Week High: ${companyData['52WeekHigh']}`
      } else if (companyData.Week52High) {
        historicalMetrics += `\n      - 52 Week High: ${companyData.Week52High}`
      }

      if (companyData['52WeekLow']) {
        historicalMetrics += `\n      - 52 Week Low: ${companyData['52WeekLow']}`
      } else if (companyData.Week52Low) {
        historicalMetrics += `\n      - 52 Week Low: ${companyData.Week52Low}`
      }

      if (companyData['50DayMovingAverage']) {
        historicalMetrics += `\n      - Moving Averages: 50-Day: ${companyData['50DayMovingAverage']}`
      } else if (companyData.Day50MovingAverage) {
        historicalMetrics += `\n      - Moving Averages: 50-Day: ${companyData.Day50MovingAverage}`
      }

      if (companyData['200DayMovingAverage']) {
        historicalMetrics += `, 200-Day: ${companyData['200DayMovingAverage']}`
      } else if (companyData.Day200MovingAverage) {
        historicalMetrics += `, 200-Day: ${companyData.Day200MovingAverage}`
      }

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

      Historical Metrics: ${historicalMetrics}
      
      Please provide detailed analysis and forecasting based on these metrics.`

      const result = await model.generateContent(prompt)
      const response = await result.response;
      return response.text();
    } catch (error) {
      throw new Error(`Failed to generate prediction: ${error.message}`)
    }
  }
}

export default Gemini