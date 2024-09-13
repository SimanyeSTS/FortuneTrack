import { connection as db } from '../config/index.js';

class AllSectors {
  static async getAll() {
    try {
      const query = `SELECT * FROM AllSectorsUnified`
      const [sectors] = await db.execute(query)
      return sectors;
    } catch (err) {
      throw err
    }
  }

  static async getBySymbol(symbol) {
    try {
      const query = `SELECT * FROM AllSectorsUnified WHERE symbol = ?`
      const [result] = await db.execute(query, [symbol])
      return result.length ? result[0] : null;
    } catch (err) {
      throw err
    }
  }
}

export { AllSectors }
