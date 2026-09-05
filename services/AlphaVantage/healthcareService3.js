import axios from 'axios';
import { connection as db } from '../../config/index.js';
import { insertOverview, normalizeOverview } from './normalizeOverview.js';

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'JHJT0T1Q8BFTMHTX';
const baseUrl = 'https://www.alphavantage.co/query';

const getHealthcareData3 = async () => {
  const symbol = 'AZN'
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

  try {
    const response = await axios.get(url)
    const data = normalizeOverview(response.data)

    await saveHealthcareData3(data)

    return data
  } catch (error) {
    throw error
  }
}

const saveHealthcareData3 = async (data) => {
  try {
    await insertOverview(db, 'Healthcare', data)
  } catch (error) {
    throw error
  }
}

export default getHealthcareData3