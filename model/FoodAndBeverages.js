import { connection as db } from "../config/index.js";
import cron from "node-cron";
import { insertOverview, updateOverview } from "../services/AlphaVantage/normalizeOverview.js";
import { fetchYahooOverview } from "../services/AlphaVantage/yahooOverview.js";

class FoodAndBeverages {
  static async getAllFoodAndBeveragesData() {
    try {
      const [rows] = await db.query(`SELECT * FROM FoodAndBeverages`);
      return rows;
    } catch (error) {
      throw new Error(`Failed to retrieve Food and Beverages data: ${error.message}`);
    }
  }

  static async getFoodAndBeveragesDataById(id) {
    try {
      const [rows] = await db.query(`SELECT * FROM FoodAndBeverages WHERE id = ?`, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to retrieve Food and Beverages data by ID: ${error.message}`);
    }
  }

  static async saveFoodAndBeveragesData(data) {
    try {
      await insertOverview(db, "FoodAndBeverages", data);
    } catch (error) {
      throw new Error(`Failed to save Food and Beverages data: ${error.message}`);
    }
  }

  static async patchFoodAndBeveragesData(id, data) {
    try {
      await updateOverview(db, "FoodAndBeverages", id, data);
    } catch (error) {
      throw new Error(`Failed to patch Food and Beverages data: ${error.message}`);
    }
  }

  static async deleteFoodAndBeveragesData(id) {
    try {
      await db.execute(`DELETE FROM FoodAndBeverages WHERE id = ?`, [id]);
    } catch (error) {
      throw new Error(`Failed to delete Food and Beverages data: ${error.message}`);
    }
  }

  static async addFoodAndBeveragesData(data) {
    try {
      await insertOverview(db, "FoodAndBeverages", data);
    } catch (error) {
      throw new Error(`Failed to add Food and Beverages data: ${error.message}`);
    }
  }

  static async fetchAndUpdateData(id, symbol) {
    try {
      const transformedData = await fetchYahooOverview(symbol);
      await FoodAndBeverages.patchFoodAndBeveragesData(id, transformedData);
    } catch (error) {
      throw new Error(`Failed to fetch and update data for ${symbol}: ${error.message}`);
    }
  }

  static async updateFoodAndBeveragesData() {
    await FoodAndBeverages.fetchAndUpdateData(1, "MCD");
  }

  static async updateFoodAndBeveragesData2() {
    await FoodAndBeverages.fetchAndUpdateData(2, "ABEV");
  }

  static async updateFoodAndBeveragesData3() {
    await FoodAndBeverages.fetchAndUpdateData(3, "DEO");
  }
}

cron.schedule("0 */2 * * *", FoodAndBeverages.updateFoodAndBeveragesData);
cron.schedule("0 */2 * * *", FoodAndBeverages.updateFoodAndBeveragesData2);
cron.schedule("0 */2 * * *", FoodAndBeverages.updateFoodAndBeveragesData3);

export default FoodAndBeverages;