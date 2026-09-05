import { connection as db } from "../config/index.js";
import axios from 'axios'
import cron from 'node-cron'
import { insertOverview, normalizeOverview, updateOverview } from '../services/AlphaVantage/normalizeOverview.js'

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'R4015USIUYJ56RBE'
const apikey2 = 'CD9K8NRWJVO13Q70'
const apikey3 = 'OD7O17P71U67DRKT'
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
      await insertOverview(db, 'Technology', data)
    } catch (error) {
      throw error
    }
  }

  static async patchTechnologyData(id, data) {
    try {
      await updateOverview(db, 'Technology', id, data)
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
      const symbol = 'INTC';
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`;
      const response = await axios.get(url);
      await Technology.patchTechnologyData(1, normalizeOverview(response.data));
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`)
    }
  }

  static async updateTechnologyData2() {
    try {
      const symbol = 'ASML';
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`;
      const response = await axios.get(url);
      await Technology.patchTechnologyData(2, normalizeOverview(response.data));
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`);
    }
  }

  static async updateTechnologyData3() {
    try {
      const symbol = 'MELI';
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey3}`;
      const response = await axios.get(url);
      await Technology.patchTechnologyData(3, normalizeOverview(response.data));
    } catch (error) {
      throw new Error(`Failed to update technology data: ${error.message}`);
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