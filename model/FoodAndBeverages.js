import { connection as db } from "../config/index.js";

class FoodAndBeverages {
  static async getFoodAndBeveragesData() {
    try {
      const query = `
      SELECT * FROM FoodAndBeverages
      `
      const [rows] = await db.query(query)
      return rows
    } catch (error) {
      console.error('Error fetching retail data:', error)
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
      console.error('Error saving FoodAndBeverages data:', error)
      throw error
    }
  }
}

export default FoodAndBeverages;