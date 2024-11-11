import axios from 'axios';
import { connection as db } from '../../config';

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'R4015USIUYJ56RBE';
const baseUrl = 'https://www.alphavantage.co/query';

const getTechnologyData = async () => {
  const symbol = 'INTC'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveTechnologyData(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveTechnologyData = async (data) => {
  try {
    const query = `INSERT INTO Technology SET ?`
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getTechnologyData