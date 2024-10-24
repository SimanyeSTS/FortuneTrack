import axios from 'axios';
import { connection as db } from '../../config/index.js';

const apikey = 'UZKLRJ8NRMMH51PQ';
const baseUrl = 'https://www.alphavantage.co/query';

const getRetailData = async () => {
  const symbol = 'COST'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveRetailData(data)
    return data
  } catch (error) {
    throw error
  }
}

const saveRetailData = async (data) => {
  try {
    const query = `
    INSERT INTO Retail SET ?
    `
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getRetailData