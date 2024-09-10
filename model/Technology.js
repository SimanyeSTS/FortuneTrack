import { connection as db } from "../config/index.js";
import axios from 'axios'
import cron from 'node-cron'

const apikey = 'R4015USIUYJ56RBE'
const baseUrl = 'https://www.alphavantage.co/query'

class Technology {
  static async getTechnologyData() {
    try {
      const query = `
      SELECT * FROM Technology
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
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
      throw error
    }
  }

  static async patchTechnologyData(id, data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }

      const columns = Object.keys(data)
      const values = Object.values(data)
      values.push(id)

      const placeholders = columns.map((column) => `${column} = ?`).join(', ')

      const query = `
      UPDATE Technology SET ${placeholders} WHERE id = ?
      `
      await db.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  static async getTechnologyDataById(id) {
    try {
      const query = `
      SELECT * FROM Technology WHERE id = ?
      `
      const [rows] = await db.query(query, [id])
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to retrieve technology data by ID: ${error.message}`)
    }
  }

  static async getAllTechnologyData() {
    try {
      const query = `
        SELECT * FROM Technology
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve all Technology data: ${error.message}`)
    }
  }

  static async deleteTechnologyData(id) {
    try {
      const query = `
      DELETE FROM Technology WHERE id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      throw error
    }
  }

  static async updateTechnologyData() {
    try {
      const symbol = 'INTC'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
      const response = await axios.get(url)
      const data = response.data

      await Technology.patchTechnologyData(1, data)
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`)
    }
  }

  static async addTechnologyData(data) {
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
      await db.execute(query, values)
    } catch (error) {
      throw new Error(`Failed to add technology data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Technology.updateTechnologyData)

export default Technology