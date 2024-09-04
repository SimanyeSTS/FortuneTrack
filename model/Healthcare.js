import { connection as db } from "../config/index.js";
class Healthcare {
  static async getHealthcareData() {
    const query = 'SELECT * FROM Healthcare';
    const [rows] = await db.query(query);
    return rows;
  }

  static async saveHealthcareData(data) {
    const query = 'INSERT INTO Healthcare SET ?';
    await db.query(query, data);
  }
}

export default Healthcare;