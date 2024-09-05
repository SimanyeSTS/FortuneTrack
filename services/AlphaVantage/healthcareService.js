import axios from 'axios';
import { connection as db } from '../../config/index.js';

const apikey = 'PIJIS96UCXDW58KF';
const baseUrl = 'https://www.alphavantage.co/query';

const getHealthcareData = async () => {
  const symbol = 'JNJ'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveHealthcareData(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveHealthcareData = async (data) => {
  try {
    const query = `INSERT INTO Healthcare SET ?`
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getHealthcareData