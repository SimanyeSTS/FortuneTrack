import { connection as db } from "../config/index.js";

class Retail {
  static async getRetailData() {
    try {
      const query = `
      SELECT * FROM Retail
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      throw error
    }
  }

  static async getRetailDataById(id) {
    try {
      const query = `
      SELECT * FROM Retail WHERE id = ?
      `
      const [rows] = await db.query(query, [id])
      return rows[0]
    } catch (error) {
      throw error
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
      throw error
    }
  }

  static async patchRetailData(id, data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
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
      throw error
    }
  }

  static async deleteRetailData(id) {
    try {
      const query = `
      DELETE FROM Retail WHERE id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      throw error
    }
  }
}

export default Retail