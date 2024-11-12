import axios from 'axios';
import { connection as db } from '../../config/index.js';

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = '67DAX9WMDSD7ISLF';
const baseUrl = 'https://www.alphavantage.co/query';

const getHealthcareData2 = async () => {
  const symbol = 'NVS'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveHealthcareData2(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveHealthcareData2 = async (data) => {
  try {
    const query = `INSERT INTO Healthcare SET ?`
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getHealthcareData2