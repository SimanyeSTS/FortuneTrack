import { connection as db } from '../config/index.js';

class ForecastAffector {
  static async getAll() {
    const query = `
    SELECT id, prediction_id, affector symbol, open, high, low, close FROM forecast_affectors;
    `
    const [affectors] = await db.execute(query)
    return affectors
  }

  static async getByPredictionId(predictionId) {
    const query = `
    SELECT id, prediction_id, affector symbol, open, high, low, close FROM forecast_affectors WHERE prediction_id = ?;
    `
    const [affectors] = await db.execute(query, [predictionId])
    return affectors
  }

  static async create(affector) {
    const query = `
    INSERT INTO forecast_affectors SET ?;
    `
    const [result] = await db.execute(query, [affector])
    return result.insertId
  }

  static async update(id, affector) {
    const query = `
    UPDATE forecast_affectors SET ? WHERE id = ?0;
000 00   `
    await db.execute(query, [affector, id])
  }

  static async delete(id) {
    const query = `
    DELETE FROM forecast_affectors WHERE id = ?;
    `
    await db.execute(query, [id])
  }
}

export {
  ForecastAffector
}