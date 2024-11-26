import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatePrediction = async (req, res) => {
  try {
    const { message, companyData } = req.body;

    if (!companyData || !companyData.Name || !companyData.Symbol) {
      return res.status(400).json({ error: 'Company data is required.' })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    let historicalMetrics = ''
    if (companyData['52WeekHigh']) {
      historicalMetrics += `\n    - 52 Week High: ${companyData['52WeekHigh']}`
    } else if (companyData['Week52High']) {
      historicalMetrics += `\n    - 52 Week High: ${companyData['Week52High']}`
    }

    if (companyData['52WeekLow']) {
      historicalMetrics += `\n    - 52 Week Low: ${companyData['52WeekLow']}`
    } else if (companyData['Week52Low']) {
      historicalMetrics += `\n    - 52 Week Low: ${companyData['Week52Low']}`
    }

    if (companyData['50DayMovingAverage']) {
      historicalMetrics += `\n    - Moving Averages: 50-Day: ${companyData['50DayMovingAverage']}`
    } else if (companyData['Day50MovingAverage']) {
      historicalMetrics += `\n    - Moving Averages: 50-Day: ${companyData['Day50MovingAverage']}`
    }

    if (companyData['200DayMovingAverage']) {
      historicalMetrics += `, 200-Day: ${companyData['200DayMovingAverage']}`
    } else if (companyData['Day200MovingAverage']) {
      historicalMetrics += `, 200-Day: ${companyData['Day200MovingAverage']}`
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
    
    Please provide detailed analysis and forecasting based on these metrics, with emphasis on future market trends and stock price predictions.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    res.json({ response: text })
  } catch (error) {
    console.error('Gemini API Error:', error)
    res.status(500).json({ error: 'Failed to generate prediction' })
  }
}

export default { 
  generatePrediction
}
