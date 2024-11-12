import { connection as db } from "../config/index.js"
import axios from "axios"
import cron from 'node-cron'

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'K9HED7RC8QLPJTT0'
const apikey2 = 'W7VKF4FSAGSTIUY2'
const apikey3 = 'I7FZD4K4SRHYLEL8'
const baseUrl = 'https://www.alphavantage.co/query'

class FoodAndBeverages {
  static async getFoodAndBeveragesData() {
    try {
      const query = `
      SELECT * FROM FoodAndBeverages
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      throw error
    }
  }

  static async saveFoodAndBeveragesData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }
      const columns = Object.keys(data)
      const values = Object.values(data)
      const placeholders = Array(columns.length).fill('?').join(', ')

      const query = `
      INSERT INTO FoodAndBeverages (${columns}) VALUES (${placeholders})
      `
      await db.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  static async getFoodAndBeveragesDataById(id) {
    try {
      const query = `
      SELECT * FROM FoodAndBeverages WHERE id = ?
      `
      const [rows] = await db.query(query, [id])
      return rows[0]
    } catch (error) {
      throw new Error(`Failed to retrieve food/beverage data by ID: ${error.message}`)
    }
  }

  static async getAllFoodAndBeveragesData() {
    try {
      const query = `
        SELECT * FROM FoodAndBeverages
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      throw new Error(`Failed to retrieve all food and beverages data: ${error.message}`)
    }
  }

  static async patchFoodAndBeveragesData(id, data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }

      const columns = Object.keys(data)
      const values =  Object.values(data)
      values.push(id)

      const placeholders = columns.map((column) => `${column} = ?`).join(', ')

      const query = `
      UPDATE FoodAndBeverages SET ${placeholders} WHERE id = ?
      `
      await db.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  static async deleteFoodAndBeveragesData(id) {
    try {
      const query = `
      DELETE FROM FoodAndBeverages WHERE id = ?
      `
      await db.execute(query, [id])
    } catch (error) {
      throw error
    }
  }

  static async updateFoodAndBeveragesData() {
    try {
      const symbol = 'MCD'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
      const response = await axios.get(url)
      const data = response.data

      await FoodAndBeverages.patchFoodAndBeveragesData(1, data)
    } catch (error) {
      throw new Error(`Failed to update Food/Beverage data: ${error.message}`)
    }
  }

  static async updateFoodAndBeveragesData2() {
    try {
      const symbol = 'ABEV'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`
      const response = await axios.get(url)
      const data = response.data

      await FoodAndBeverages.patchFoodAndBeveragesData(2, data)
    } catch (error) {
      throw new Error(`Failed to update Food/Beverage data: ${error.message}`)
    }
  }

  static async updateFoodAndBeveragesData3() {
    try {
      const symbol = 'DEO'
      const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey3}`
      const response = await axios.get(url)
      const data = response.data

      await FoodAndBeverages.patchFoodAndBeveragesData(3, data)
    } catch (error) {
      throw new Error(`Failed to update Food/Beverage data: ${error.message}`)
    }
  }

  static async addFoodAndBeveragesData(data) {
    try {
      if (!data) {
        throw new Error('Data cannot be null or undefined')
      }

      const columns = Object.keys(data)
      const values = Object.values(data)
      const placeholders = Array(columns.length).fill('?').join(', ')

      const query = `
      INSERT INTO FoodAndBeverages (${columns}) VALUES (${placeholders})
      `
      await db.execute(query, values)
    } catch (error) {
      throw new Error(`Failed to add food/beverages data ${error.message}`)
    }
  }
}

cron.schedule('0 */2 * * *', FoodAndBeverages.updateFoodAndBeveragesData)
cron.schedule('0 */2 * * *', FoodAndBeverages.updateFoodAndBeveragesData2)
cron.schedule('0 */2 * * *', FoodAndBeverages.updateFoodAndBeveragesData3)

export default FoodAndBeverages