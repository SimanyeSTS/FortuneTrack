import { connection as db } from "../config/index.js"
import axios from "axios"
import cron from 'node-cron'

const apikey = 'PIJIS96UCXDW58KF'
const baseUrl = 'https://www.alphavantage.co/query'
class Healthcare {
  static async getHealthcareData() {
    try {
      const query = `
      SELECT * FROM Healthcare
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
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
      throw error
    }
  }

  static async getHealthcareDataById(id) {
    try {
      const query = `
      SELECT * FROM Healthcare WHERE id = ?
      `
      const [rows] = await db.query(query, [id])
      return rows[0]
    } catch (error) {
      throw Error(`Failed to retrieve Healthcare data by ID: ${error.message}`)
    }
  }

  static async getAllHealthcareData() {
    try {
      const query = `
        SELECT * FROM Healthcare
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve all healthcare data: ${error.message}`)
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
      throw error
    }
  }

  static async deleteHealthcareData(id) {
    try {
      const query = `
      DELETE FROM Healthcare WHERE id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      throw error
    }
  }

  static async updateHealthcareData() {
    try {
      const symbol = 'JNJ'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
      const response = await axios.get(url)
      const data = response.data

      await Healthcare.patchHealthcareData(1, data)
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async addHealthcareData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }
      const columns = Object.keys(data)
      const values = Object.values(data)
      const placeholders = Array(columns.length).fill('?').join(', ')

      const query = `
      INSERT INTO Healthcare (${columns}) VALUES (${placeholders})
      `
      await db.execute(query, values)
    } catch (error) {
      throw new Error(`Failed to add retail data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData)
export default Healthcare