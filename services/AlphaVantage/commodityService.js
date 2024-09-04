import axios from 'axios';
import { connection as db } from '../../config/index.js';

const fetchCommodityData = async () => {
  const apiKey = 'K9HED7RC8QLPJTT0';
  const globalCommodityUrl = `https://www.alphavantage.co/query?function=ALL_COMMODITIES&interval=monthly&apikey=${apiKey}`;
  const wtiUrl = `https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey=${apiKey}`;
  const brentUrl = `https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=${apiKey}`;

  try {
    const [globalCommodityResponse, wtiResponse, brentResponse] = await Promise.all([
      axios.get(globalCommodityUrl),
      axios.get(wtiUrl),
      axios.get(brentUrl)
    ]);

    const globalCommodityData = globalCommodityResponse.data.data;
    const wtiData = wtiResponse.data.data;
    const brentData = brentResponse.data.data;

    // Calculate average, high, and low for Global Price Index
    const lastMonthGlobalCommodityValue = globalCommodityData[0].value;
    const lastMonthWtiValue = wtiData[0].value;
    const lastMonthBrentValue = brentData[0].value;

    const average = (parseFloat(lastMonthWtiValue) + parseFloat(lastMonthBrentValue)) / 2;
    const high = Math.max(parseFloat(lastMonthWtiValue), parseFloat(lastMonthBrentValue));
    const low = Math.min(parseFloat(lastMonthWtiValue), parseFloat(lastMonthBrentValue));

    // Determine market status
    const marketStatus = parseFloat(lastMonthGlobalCommodityValue) > parseFloat(globalCommodityData[1].value) ? 'bullish' : 'bearish';

    // Create prediction objects
    const globalCommodityPrediction = {
      type: 'commodity',
      symbol: 'ALL_COMMODITIES',
      value: lastMonthGlobalCommodityValue,
      average,
      high,
      low,
      status: marketStatus,
      month: new Date(globalCommodityData[0].date)
    };

    const wtiPrediction = {
      type: 'commodity',
      symbol: 'WTI',
      value: lastMonthWtiValue,
      month: new Date(wtiData[0].date)
    };

    const brentPrediction = {
      type: 'commodity',
      symbol: 'BRENT',
      value: lastMonthBrentValue,
      month: new Date(brentData[0].date)
    };

    // Store data in database
    await db.query('INSERT INTO predictions SET ?', globalCommodityPrediction);
    await db.query('INSERT INTO forecast_contributors SET ?', wtiPrediction);
    await db.query('INSERT INTO forecast_contributors SET ?', brentPrediction);
  } catch (error) {
    console.error(`Error fetching commodity data: ${error.message}`);
  }
}

export default {
  fetchCommodityData
}