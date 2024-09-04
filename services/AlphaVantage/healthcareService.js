import axios from 'axios';
import { connection } from '../../config/index.js';

const apikey = 'PIJIS96UCXDW58KF';
const baseUrl = 'https://www.alphavantage.co/query';

const getHealthcareData = async () => {
  const symbol = 'JNJ';
  const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Save data to database
    await saveHealthcareData(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

const saveHealthcareData = async (data) => {
  // Connect to database
  const db = await connection();

  // Save data to Healthcare table
  const query = `INSERT INTO Healthcare SET ?`;
  await db.query(query, data);

  // Close database connection
  await db.end();
};

export default getHealthcareData;