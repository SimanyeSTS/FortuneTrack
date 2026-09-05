import axios from 'axios';
import { connection as db } from '../../config/index.js';
import { insertOverview, normalizeOverview } from './normalizeOverview.js';

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'CD9K8NRWJVO13Q70';
const baseUrl = 'https://www.alphavantage.co/query';

const getTechnologyData2 = async () => {
  const symbol = 'ASML'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = normalizeOverview(response.data)

    await saveTechnologyData2(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveTechnologyData2 = async (data) => {
  try {
    await insertOverview(db, 'Technology', data)
  } catch (error) {
    throw error
  }
}

export default getTechnologyData2