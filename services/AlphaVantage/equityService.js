import axios from 'axios';
import { connection as db } from '../../config/index.js';

const fetchEquityData = async (symbol) => {
  const apiKey = 'UZKLRJ8NRMMH51PQ'
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    if (!data['Monthly Time Series']) {
      throw new Error(`No data found for symbol ${symbol}`)
    }

    const latestData = data['Monthly Time Series'][Object.keys(data['Monthly Time Series'])[0]]
    const prediction = {
      type: 'equity',
      symbol,
      open: latestData['1. open'],
      high: latestData['2. high'],
      low: latestData['3. low'],
      average: (parseFloat(latestData['2. high']) + parseFloat(latestData['3. low'])) / 2,
      status: parseFloat(latestData['4. close']) > parseFloat(latestData['1. open']) ? 'bullish' : 'bearish',
      month: new Date(Object.keys(data['Monthly Time Series'])[0]),
    };
    await db.query('INSERT INTO predictions SET ?', prediction);
  } catch (error) {
    console.error(`Error fetching equity data for ${symbol}: ${error.message}`)
  }
}

export default {
    fetchEquityData
}