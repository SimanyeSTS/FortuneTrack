import { connection as db } from "../config/index.js";

class Healthcare {
  static async getHealthcareData() {
    try {
      const query = `
      SELECT * FROM Healthcare
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      console.error('Error fetching healthcare data:', error)
      throw error
    }
  }

  static async saveHealthcareData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }
      const columns = Object.keys(data)
      const values =  Object.values(data)
      const placeholders = Array(columns.length).fill('?').join(', ')

      const query = `
      INSERT INTO Healthcare (${columns}) VALUES (${placeholders})
      `
      await db.execute(query, values)
    } catch (error) {
      console.error('Error saving healthcare data:', error)
      throw error
    }
  }

  static async patchHealthcareData(id, data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }

      const columns = Object.keys(data)
      const values = Object.values(data)
      values.push(id)

      const placeholders = columns.map((column) => `${column} = ?`).join(', ')

      const query = `
      UPDATE Healthcare SET ${placeholders} WHERE id = ?
      `
      await db.execute(query, values)
    } catch (error) {
      console.error('Error updating healthcare data:', error)
      throw error
    }
  }

  static async deleteHealthcareData(id) {
    try {
      const query = `
      DELETE FROM Healthcare where id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      console.error('Error deleting healthcare data:', error)
      throw error
    }
  }
}

export default Healthcare