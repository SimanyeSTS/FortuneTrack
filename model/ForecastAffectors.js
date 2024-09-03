import { connection as db } from '../config/index.js';

class ForecastAffector {
  static async getAll() {
    const query = `
    SELECT * FROM forecast_affectors;
    `
    const affectors = await db.query(query)
    return affectors
  }

  static async getByPredictionId(predictionId) {
    const query = `
    SELECT * FROM forecast_affectors WHERE prediction_id = ?;
    `
    const affectors = await db.query(query, predictionId)
    return affectors
  }

  static async create(affector) {
    const query = `
    INSERT INTO forecast_affectors SET ?
    `
    const result = await db.query(query, affector)
    return result.insertId
  }

  static async update(id, affector) {
    const query = `
    UPDATE forecast_affectors SET ? WHERE id = ?
    `
    await db.query(query, [affector, id])
  }

  static async delete(id) {
    const query = `
    DELETE FROM forecast_affectors WHERE id = ?;
    `
    await db.query(query, id)
  }
}

export {
    ForecastAffector
}