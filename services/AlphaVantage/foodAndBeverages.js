import axios from 'axios';
import { connection as db } from '../../config/index.js';

const apikey = 'K9HED7RC8QLPJTT0';
const baseUrl = 'https://www.alphavantage.co/query';

const getFoodAndBeveragesData = async () => {
  const symbol = 'MCD'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveFoodAndBeveragesData(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveFoodAndBeveragesData = async (data) => {
  try {
    const query = `INSERT INTO FoodAndBeverages SET ?`
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getFoodAndBeveragesData