import axios from 'axios';
import { connection } from '../../config';

const apikey = 'R4015USIUYJ56RBE';
const baseUrl = 'https://www.alphavantage.co/query';

const getTechnologyData = async () => {
  const symbol = 'INTC';
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Save data to database
    await saveTechnologyData(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const saveTechnologyData = async (data) => {
  // Connect to database
  const db = await connection();

  // Save data to Technology table
  const query = `INSERT INTO Technology SET ?`;
  await db.query(query, data);

  // Close database connection
  await db.end();
};

export default getTechnologyData;