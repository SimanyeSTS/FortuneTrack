import { connection as db } from "../config/index.js"
import cron from 'node-cron'
import { insertOverview, updateOverview } from '../services/AlphaVantage/normalizeOverview.js'
import { fetchYahooOverview } from '../services/AlphaVantage/yahooOverview.js'

class Healthcare {
  static async getHealthcareData() {
    const [rows] = await db.query(`SELECT * FROM Healthcare`)
    return rows
  }

  static async saveHealthcareData(data) {
    await insertOverview(db, 'Healthcare', data)
  }

  static async getHealthcareDataById(id) {
    try {
      const [rows] = await db.query(`SELECT * FROM Healthcare WHERE id = ?`, [id])
      return rows[0]
    } catch (error) {
      throw Error(`Failed to retrieve Healthcare data by ID: ${error.message}`)
    }
  }

  static async getAllHealthcareData() {
    try {
      const [rows] = await db.query(`SELECT * FROM Healthcare`)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve all healthcare data: ${error.message}`)
    }
  }

  static async patchHealthcareData(id, data) {
    await updateOverview(db, 'Healthcare', id, data)
  }

  static async deleteHealthcareData(id) {
    await db.execute(`DELETE FROM Healthcare WHERE id = ?`, [id])
  }

  static async updateHealthcareData() {
    try {
      const data = await fetchYahooOverview('JNJ')
      await Healthcare.patchHealthcareData(1, data)
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async updateHealthcareData2() {
    try {
      const data = await fetchYahooOverview('NVS')
      await Healthcare.patchHealthcareData(2, data)
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async updateHealthcareData3() {
    try {
      const data = await fetchYahooOverview('AZN')
      await Healthcare.patchHealthcareData(3, data)
    } catch (error) {
      throw new Error(`Failed to update healthcare data: ${error.message}`)
    }
  }

  static async addHealthcareData(data) {
    try {
      await insertOverview(db, 'Healthcare', data)
    } catch (error) {
      throw new Error(`Failed to add healthcare data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData)
cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData2)
cron.schedule('0 */2 * * *', Healthcare.updateHealthcareData3)

export default Healthcare