import Technology from '../model/Technology.js'
import axios from 'axios';

const apikey = 'R4015USIUYJ56RBE';
const baseUrl = 'https://www.alphavantage.co/query';

const getTechnologyData = async (req, res) => {
  try {
    const symbol = 'INTC';
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;
    const response = await axios.get(url);
    const data = response.data;

    await Technology.saveTechnologyData(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching technology data' });
  }
};

export default { getTechnologyData };