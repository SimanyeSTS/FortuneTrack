import axios from 'axios';
import { connection as db } from '../../config/index.js';

const apikey = 'OFXEEMU7MC6ZSWYL';
const baseUrl = 'https://www.alphavantage.co/query';

const getRetailData3 = async () => {
  const symbol = 'TGT'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = response.data

    await saveRetailData3(data)
    return data
  } catch (error) {
    throw error
  }
}

const saveRetailData3 = async (data) => {
  try {
    const query = `
    INSERT INTO Retail SET ?
    `
    await db.query(query, data)
  } catch (error) {
    throw error
  }
}

export default getRetailData3