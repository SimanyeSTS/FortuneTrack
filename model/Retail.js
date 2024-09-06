import { connection as db } from "../config/index.js"
import axios from 'axios'
import cron from 'node-cron'

const apikey = 'UZKLRJ8NRMMH51PQ'
const baseUrl = 'https://www.alphavantage.co/query'

class Retail {
  static async getRetailData() {
    try {
      const query = `
      SELECT * FROM Retail
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve retail data: ${error.message}`)
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
      throw new Error(`Failed to retrieve retail data by ID: ${error.message}`)
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
      throw new Error(`Failed to save retail data: ${error.message}`)
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
      throw new Error(`Failed to patch retail data: ${error.message}`)
    }
  }

  static async deleteRetailData(id) {
    try {
      const query = `
      DELETE FROM Retail WHERE id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      throw new Error(`Failed to delete retail data: ${error.message}`)
    }
  }

  static async updateRetailData() {
    try {
      const symbol = 'COST'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
      const response = await axios.get(url)
      const data = response.data

      await Retail.patchRetailData(1, data)
    } catch (error) {
      throw new Error(`Failed to update retail data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Retail.updateRetailData)

export default Retail