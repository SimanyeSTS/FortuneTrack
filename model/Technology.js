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

  static async patchTechnologyData(id, data) {
    try {
      if (!data) {
        throw new  Error('Data cannot be null or undefined')
      }

      const columns = Object.keys(data)
      const values = Object.values(data)
      values.push(id)

      const placeholders = columns.map((column) => `${column} = ?`).join(', ')

      const query = `
      UPDATE Retail SET ${placeholders} WHERE id = ?
      `
      await db.execute(query, values)
    } catch (error) {
      console.error('Error updating technology data:', error)
      throw new error
    }
  }

  static async deleteTechnologyData(id) {
    try {
      const query = `
      DELETE FROM Technology WHERE id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      console.error('Error deleting technology data:', error)
    }
  }
}

export default Technology