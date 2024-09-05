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
}

export default FoodAndBeverages;