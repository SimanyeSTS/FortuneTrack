import Healthcare from '../model/Healthcare.js';
import axios from 'axios';

const apikey = 'PIJIS96UCXDW58KF';
const baseUrl = 'https://www.alphavantage.co/query';

const getHealthcareData = async (req, res) => {
  try {
    const symbol = 'JNJ';
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;
    const response = await axios.get(url);
    const data = response.data;

    await Healthcare.saveHealthcareData(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching healthcare data' });
  }
};

export default { getHealthcareData };