import { connection as db } from '../config/index.js';

class ForecastContributor {
  static async getAll() {
    const query = `
    SELECT id, prediction_id, contributor_symbol, open, high, low, close FROM forecast_contributors;
    `
    const [contributors] = await db.execute(query)
    return contributors
  }

  static async getByPredictionId(predictionId) {
    const query = `
    SELECT id, prediction_id, contributor_symbol, open, high, low, close FROM forecast_contributors WHERE prediction_id = ?;
    `
    const [contributors] = await db.execute(query, [predictionId])
    return contributors
  }

  static async create(contributor) {
    const query = `
    INSERT INTO forecast_contributors SET ?;
    `
    const [result] = await db.execute(query, [contributor])
    return result.insertId
  }

  static async update(id, contributor) {
    const query = `
    UPDATE forecast_contributors SET ? WHERE id = ?;
    `
    await db.execute(query, [contributor, id])
  }

  static async delete(id) {
    const query = `
    DELETE FROM forecast_contributors WHERE id = ?;
    `
    await db.execute(query, [id])
  }
}

export {
  ForecastContributor
}