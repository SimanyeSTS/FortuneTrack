import { connection as db } from "../config/index.js"
import axios from "axios"
import cron from 'node-cron'
import { insertOverview, normalizeOverview, updateOverview } from '../services/AlphaVantage/normalizeOverview.js'

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'PIJIS96UCXDW58KF'
const apikey2 = '67DAX9WMDSD7ISLF'
const apikey3 = 'JHJT0T1Q8BFTMHTX'

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
      await insertOverview(db, 'Healthcare', data)
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
      await updateOverview(db, 'Healthcare', id, data)
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
      await Healthcare.patchHealthcareData(1, normalizeOverview(response.data))
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async updateHealthcareData2() {
    try {
      const symbol = 'NVS'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`
      const response = await axios.get(url)
      await Healthcare.patchHealthcareData(2, normalizeOverview(response.data))
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async updateHealthcareData3() {
    try {
      const symbol = 'AZN'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey3}`
      const response = await axios.get(url)
      await Healthcare.patchHealthcareData(3, normalizeOverview(response.data))
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async addHealthcareData(data) {
    try {
      await insertOverview(db, 'Healthcare', data)
    } catch (error) {
      throw new Error(`Failed to add retail data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData)
cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData2)
cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData3)

export default Healthcare