import { connection as db } from '../config/index.js';

class AllSectors {
  static async getAll() {
    try {
      const query = `
        SELECT * FROM AllSectorsUnified;
      `;
      const [sectors] = await db.execute(query);
      return sectors;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { AllSectors };