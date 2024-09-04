import { connection as db } from "../config/index.js";

class FoodAndBeverages {
  static async getFoodAndBeveragesData() {
    const query = 'SELECT * FROM FoodAndBeverages';
    const [rows] = await db.query(query);
    return rows;
  }

  static async saveFoodAndBeveragesData(data) {
    const query = 'INSERT INTO FoodAndBeverages SET ?';
    await db.query(query, data);
  }
}

export default FoodAndBeverages;