import axios from 'axios';
import { connection as db } from '../../config/index.js';

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'I7FZD4K4SRHYLEL8';
const baseUrl = 'https://www.alphavantage.co/query';

const getFoodAndBeveragesData3 = async () => {
  const symbol = 'DEO'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveFoodAndBeveragesData3(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveFoodAndBeveragesData3 = async (data) => {
  try {
    const query = `INSERT INTO FoodAndBeverages SET ?`
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getFoodAndBeveragesData3