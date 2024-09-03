import { connection as db } from '../config/index.js';

class Prediction {
  static async getAll(type) {
    const query = type ? `
    SELECT * FROM predictions WHERE type = ?` : `SELECT * FROM predictions;
    `
    const predictions = await db.query(query, type)
    return predictions
  }

  static async getByType(type) {
    const query = `
    SELECT * FROM predictions WHERE type = ?;
    `
    const predictions = await db.query(query, type)
    return predictions
  }

  static async getById(id) {
    const query = `
    SELECT * FROM predictions WHERE id = ?;
    `
    const prediction = await db.query(query, id)
    return prediction[0]
  }

  static async create(prediction) {
    const query = `
    INSERT INTO predictions SET ?;
    `
    const result = await db.query(query, prediction)
    return result.insertId
  }

  static async update(id, prediction) {
    const query = `
    UPDATE predictions SET ? WHERE id = ?;
    `
    await db.query(query, [prediction, id])
  }

  static async delete(id) {
    const query = `
    DELETE FROM predictions WHERE id = ?;
    `
    await db.query(query, id)
  }
}

export {
    Prediction
}