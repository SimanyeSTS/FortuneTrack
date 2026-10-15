import { connection as db } from "../config/index.js"
import cron from 'node-cron'
import { insertOverview, updateOverview } from '../services/AlphaVantage/normalizeOverview.js'
import { fetchYahooOverview } from '../services/AlphaVantage/yahooOverview.js'

class Retail {
  static async getRetailData() {
    try {
      const [rows] = await db.query(`SELECT * FROM Retail`)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve retail data: ${error.message}`)
    }
  }

  static async getRetailDataById(id) {
    try {
      const [rows] = await db.query(`SELECT * FROM Retail WHERE id = ?`, [id])
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to retrieve retail data by ID: ${error.message}`)
    }
  }

  static async getRetailDataBySymbol(Symbol) {
    try {
      const [rows] = await db.query(`SELECT * FROM Retail WHERE Symbol = ?`, [Symbol])
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to retrieve retail data by Symbol: ${error.message}`)
    }
  }

  static async getAllRetailData() {
    try {
      const [rows] = await db.query(`SELECT * FROM Retail`)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve all retail data: ${error.message}`)
    }
  }

  static async saveRetailData(data) {
    try {
      await insertOverview(db, 'Retail', data)
    } catch (error) {
      throw new Error(`Failed to save retail data: ${error.message}`)
    }
  }

  static async patchRetailData(id, data) {
    try {
      await updateOverview(db, 'Retail', id, data)
    } catch (error) {
      throw new Error(`Failed to patch retail data: ${error.message}`)
    }
  }

  static async deleteRetailData(id) {
    try {
      await db.execute(`DELETE FROM Retail WHERE id = ?`, [id])
    } catch (error) {
      throw new Error(`Failed to delete retail data: ${error.message}`)
    }
  }

  static async updateRetailData() {
    try {
      const data = await fetchYahooOverview('COST')
      await Retail.patchRetailData(1, data)
    } catch (error) {
      throw new Error(`Failed to update retail data: ${error.message}`)
    }
  }

  static async updateRetailData2() {
    try {
      const data = await fetchYahooOverview('BABA')
      await Retail.patchRetailData(2, data)
    } catch (error) {
      throw new Error(`Failed to update retail data: ${error.message}`)
    }
  }

  static async updateRetailData3() {
    try {
      const data = await fetchYahooOverview('UL')
      await Retail.patchRetailData(3, data)
    } catch (error) {
      throw new Error(`Failed to update retail data: ${error.message}`)
    }
  }

  static async addRetailData(data) {
    try {
      await insertOverview(db, 'Retail', data)
    } catch (error) {
      throw new Error(`Failed to add retail data: ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', Retail.updateRetailData)
cron.schedule('0 */2 * * *', Retail.updateRetailData2)
cron.schedule('0 */2 * * *', Retail.updateRetailData3)

export default Retail