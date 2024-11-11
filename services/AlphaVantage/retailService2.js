import axios from 'axios';
import { connection as db } from '../../config/index.js';

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'QDH8TZ6T7U3FFARZ';
const baseUrl = 'https://www.alphavantage.co/query';

const getRetailData2 = async () => {
  const symbol = 'BABA'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveRetailData2(data)
    return data
  } catch (error) {
    throw error
  }
}

const saveRetailData2 = async (data) => {
  try {
    const query = `
    INSERT INTO Retail SET ?
    `
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getRetailData2