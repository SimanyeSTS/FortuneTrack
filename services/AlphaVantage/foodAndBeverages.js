import axios from 'axios';
import { connection } from '../../config/index.js';

const apikey = 'K9HED7RC8QLPJTT0';
const baseUrl = 'https://www.alphavantage.co/query';

const getFoodAndBeveragesData = async () => {
  const symbol = 'MCD';
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Save data to database
    await saveFoodAndBeveragesData(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const saveFoodAndBeveragesData = async (data) => {
  // Connect to database
  const db = await connection();

  // Save data to FoodAndBeverages table
  const query = `INSERT INTO FoodAndBeverages SET ?`;
  await db.query(query, data);

  // Close database connection
  await db.end();
};

export default getFoodAndBeveragesData;