import axios from 'axios';
import { connection } from '../../config/index.js';

const apikey = 'UZKLRJ8NRMMH51PQ';
const baseUrl = 'https://www.alphavantage.co/query';

const getRetailData = async () => {
  const symbol = 'COST';
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Save data to database
    await saveRetailData(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const saveRetailData = async (data) => {
  // Connect to database
  const db = await connection();

  // Save data to Retail table
  const query = `INSERT INTO Retail SET ?`;
  await db.query(query, data);

  // Close database connection
  await db.end();
};

export default getRetailData;