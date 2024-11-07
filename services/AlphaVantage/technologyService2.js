import axios from 'axios';
import { connection as db } from '../../config';

const apikey = 'CD9K8NRWJVO13Q70';
const baseUrl = 'https://www.alphavantage.co/query';

const getTechnologyData2 = async () => {
  const symbol = 'CSCO'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveTechnologyData2(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveTechnologyData2 = async (data) => {
  try {
    const query = `INSERT INTO Technology SET ?`
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getTechnologyData2