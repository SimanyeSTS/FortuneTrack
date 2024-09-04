import { connection as db } from "../config/index.js";

class Retail {
  static async getRetailData() {
    try {
      const query = 'SELECT * FROM Retail';
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error fetching retail data:', error);
      throw error;
    }
  }

  static async saveRetailData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined');
      }

      const query = 'INSERT INTO Retail SET ?';
      await db.query(query, data);
    } catch (error) {
      console.error('Error saving retail data:', error);
      throw error;
    }
  }
}

export default Retail;