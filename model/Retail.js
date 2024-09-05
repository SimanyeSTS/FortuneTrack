import { connection as db } from "../config/index.js";

class Retail {
  static async getRetailData() {
    try {
      const query = `
      SELECT * FROM Retail
      `
      const [rows] = await db.query(query)
      return rows;
    } catch (error) {
      console.error('Error fetching retail data:', error)
      throw error;
    }
  }

  static async saveRetailData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }
  
      const columns = Object.keys(data)
      const values = Object.values(data)
      const placeholders = Array(columns.length).fill('?').join(', ')
  
      const query = `
      INSERT INTO Retail (${columns}) VALUES (${placeholders})
      `
      await db.execute(query, values)
    } catch (error) {
      console.error('Error saving retail data:', error)
      throw error
    }
  }
}

export default Retail