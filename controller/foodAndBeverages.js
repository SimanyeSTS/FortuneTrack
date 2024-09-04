import FoodAndBeverages from '../model/FoodAndBeverages.js';
import axios from 'axios';

const apikey = 'K9HED7RC8QLPJTT0';
const baseUrl = 'https://www.alphavantage.co/query';

const getFoodAndBeveragesData = async (req, res) => {
  try {
    const symbol = 'MCD';
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;
    const response = await axios.get(url);
    const data = response.data;

    await FoodAndBeverages.saveFoodAndBeveragesData(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching food and beverages data' });
  }
};

export default { getFoodAndBeveragesData };