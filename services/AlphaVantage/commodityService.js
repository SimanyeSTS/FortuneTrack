import axios from 'axios';
import { connection as db } from '../../config/index.js';

const fetchCommodityData = async (symbol) => {
  const apiKey = 'K9HED7RC8QLPJTT0'
  const url = `https://www.alphavantage.co/query?function=${symbol === 'ALL_COMMODITIES' ? 'ALL_COMMODITIES' : symbol === 'WTI' ? 'WTI' : 'BRENT'}&interval=monthly&apikey=${apiKey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    if (symbol === 'ALL_COMMODITIES') {
      const globalCommodityIndex = data['Global Price Index of All Commodities']
      const lastMonthData = globalCommodityIndex[Object.keys(globalCommodityIndex)[0]]
      const prediction = {
        type: 'commodity',
        symbol,
        value: lastMonthData,
        average: (parseFloat(lastMonthData) + parseFloat(lastMonthData)) / 2,
        status: parseFloat(lastMonthData) > 0 ? 'bullish' : 'bearish',
        month: new Date(Object.keys(globalCommodityIndex)[0]),
      }
      await db.query('INSERT INTO predictions SET ?', prediction)
    }

    else {
      const lastMonthData = data['Monthly Time Series'][Object.keys(data['Monthly Time Series'])[0]]
      const prediction = {
        type: 'commodity',
        symbol,
        open: lastMonthData['1. open'],
        high: lastMonthData['2. high'],
        low: lastMonthData['3. low'],
        average: (parseFloat(lastMonthData['2. high']) + parseFloat(lastMonthData['3. low'])) / 2,
        status: parseFloat(lastMonthData['4. close']) > parseFloat(lastMonthData['1. open']) ? 'bullish' : 'bearish',
        month: new Date(Object.keys(data['Monthly Time Series'])[0]),
      }
      await db.query('INSERT INTO predictions SET ?', prediction)
    }
  } catch (error) {
    console.error(`Error fetching commodity data: ${error.message}`)
  }
}

export default {
    fetchCommodityData
}