import { connection as db } from "../config/index.js";

class Technology {
  static async getTechnologyData() {
    try {
      const query = `
      SELECT * FROM Technology
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      console.error('Error fetching technoloogy data:', error)
      throw error
    }
  }

  static async saveTechnologyData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }

      const columns = Object.keys(data)
      const values = Object.values(data)
      const placeholders = Array(columns.length).fill('?').join(', ')

      const query = `
      INSERT INTO Technology (${columns}) VALUES (${placeholders})
      `
      await db.query(query, values)
    } catch (error) {
      console.error('Error saving technology data:', error)
      throw error
    }
  }
}

export default Technology