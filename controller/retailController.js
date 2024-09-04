import axios from 'axios';
import Retail from '../model/Retail.js';

const apikey = 'UZKLRJ8NRMMH51PQ';
const baseUrl = 'https://www.alphavantage.co/query';

const getRetailData = async (req, res) => {
  try {
    const symbol = 'COST';
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;
    const response = await axios.get(url);
    const data = response.data;

    console.log('Data:', data); // Log data

    // Store data in database
    await Retail.saveRetailData(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching retail data' });
  }
};

export default { getRetailData };