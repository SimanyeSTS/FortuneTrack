import axios from 'axios';
import { connection as db } from '/config/index.js';

const fetchCryptoData = async (symbol) => {
  const apiKey = 'PIJIS96UCXDW58KF'
  const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${symbol}&market=EUR&apikey=${apiKey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    if (!data['Monthly Time Series']) {
      throw new Error(`No data found for symbol ${symbol}`)
    }

    const lastMonthData = data['Monthly Time Series'][Object.keys(data['Monthly Time Series'])[0]]
    const prediction = {
      type: 'crypto',
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
    console.error(`Error fetching crypto data for ${symbol}: ${error.message}`)
  }
}

export {
    fetchCryptoData
}