import { connection as db } from "../config/index.js";

class Technology {
  static async getTechnologyData() {
    const query = 'SELECT * FROM Technology';
    const [rows] = await db.query(query);
    return rows;
  }

  static async saveTechnologyData(data) {
    const query = 'INSERT INTO Technology SET ?';
    await db.query(query, data);
  }
}

export default Technology;