import { connection as db } from "../config/index.js"
import cron from 'node-cron'
import { insertOverview, updateOverview } from '../services/AlphaVantage/normalizeOverview.js'
import { fetchYahooOverview } from '../services/AlphaVantage/yahooOverview.js'

class Technology {
  static async getTechnologyData() {
    const [rows] = await db.query(`SELECT * FROM Technology`)
    return rows
  }

  static async saveTechnologyData(data) {
    await insertOverview(db, 'Technology', data)
  }

  static async patchTechnologyData(id, data) {
    await updateOverview(db, 'Technology', id, data)
  }

  static async getTechnologyDataById(id) {
    try {
      const [rows] = await db.query(`SELECT * FROM Technology WHERE id = ?`, [id])
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to retrieve technology data by ID: ${error.message}`)
    }
  }

  static async getAllTechnologyData() {
    try {
      const [rows] = await db.query(`SELECT * FROM Technology`)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve all Technology data: ${error.message}`)
    }
  }

  static async deleteTechnologyData(id) {
    await db.execute(`DELETE FROM Technology WHERE id = ?`, [id])
  }

  static async updateTechnologyData() {
    try {
      const data = await fetchYahooOverview('INTC')
      await Technology.patchTechnologyData(1, data)
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`)
    }
  }

  static async updateTechnologyData2() {
    try {
      const data = await fetchYahooOverview('ASML')
      await Technology.patchTechnologyData(2, data)
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`)
    }
  }

  static async updateTechnologyData3() {
    try {
      const data = await fetchYahooOverview('MELI')
      await Technology.patchTechnologyData(3, data)
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`)
    }
  }

  static async addTechnologyData(data) {
    try {
      await insertOverview(db, 'Technology', data)
    } catch (error) {
      throw new Error(`Failed to add technology data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Technology.updateTechnologyData)
cron.schedule('0 */2 * * *', Technology.updateTechnologyData2)
cron.schedule('0 */2 * * *', Technology.updateTechnologyData3)

export default Technology