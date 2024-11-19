import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePrediction = async (req, res) => {
  try {
    const { message, companyData } = req.body;

    // Ensure that companyData is provided and valid
    if (!companyData || !companyData.Name || !companyData.Symbol) {
      return res.status(400).json({ error: 'Company data is required.' });
    }

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
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
};

export default generatePrediction; // Default export