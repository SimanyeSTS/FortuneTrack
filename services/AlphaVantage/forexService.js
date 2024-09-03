import axios from 'axios';
import { connection as db } from '/config/index.js'

const fetchForexData = async (symbol) => {
  const apiKey = 'R4015USIUYJ56RBE'
  const [fromSymbol, toSymbol] = symbol.split('/')
  const url = `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=${apiKey}`

  try {
    const response = await axios.get(url)
    const data = response.data;

    if (!data['Monthly Time Series']) {
      throw new Error(`No data found for symbol ${symbol}`)
    }

    const lastMonthData = data['Monthly Time Series'][Object.keys(data['Monthly Time Series'])[0]]
    const prediction = {
      type: 'forex',
      symbol,
      open: lastMonthData['1. open'],
      high: lastMonthData['2. high'],
      low: lastMonthData['3. low'],
      average: (parseFloat(lastMonthData['2. high']) + parseFloat(lastMonthData['3. low'])) / 2,
      status: parseFloat(lastMonthData['4. close']) > parseFloat(lastMonthData['1. open']) ? 'bullish' : 'bearish',
      month: new Date(Object.keys(data['Monthly Time Series'])[0]),
    };
    await db.query('INSERT INTO predictions SET ?', prediction)
  } catch (error) {
    console.error(`Error fetching forex data for ${symbol}: ${error.message}`)
  }
}

export {
    fetchForexData
}