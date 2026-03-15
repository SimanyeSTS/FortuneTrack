import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_MODEL = 'gemini-3.1-pro-preview';

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

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    const response = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt
    });

    const text = response?.text;

    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return res.json({ response: text, model: GEMINI_MODEL });
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
      error: error?.message || 'An error occurred while generating the prediction'
    });
  }
};

export default {
  generatePrediction
};
