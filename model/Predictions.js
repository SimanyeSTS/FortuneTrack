import { connection as db } from '../config/index.js';

class Prediction {
  static async getAll(type) {
    const query = type ? `
    SELECT id, type, symbol, open, high, low, average, status, month FROM predictions WHERE type = ?;
    ` : `
    SELECT id, type, symbol, open, high, low, average, status, month FROM predictions
    ;`
    const [predictions] = await db.execute(query, type)
    return predictions
  }

  static async getByType(type) {
    const query = `
    SELECT  FROM predictions WHERE type = ?;
    `
    const [predictions] = await db.execute(query, [type])
    return predictions
  }

  static async getById(id) {
    const query = `
    SELECT id, type, symbol, open, high, low, average, status, month FROM predictions WHERE id = ?;
    `
    const [prediction] = await db.execute(query, [id])
    return prediction
  }

  static async create(prediction) {
    const query = `
    INSERT INTO predictions SET ?;
    `
    const [result] = await db.execute(query, [prediction])
    return result.insertId
  }

  static async update(id, prediction) {
    const query = `
    UPDATE predictions SET ? WHERE id = ?;
    `
    await db.execute(query, [prediction, id])
  }

  static async delete(id) {
    const query = `
    DELETE FROM predictions WHERE id = ?;
    `
    await db.execute(query, [id])
  }
}

export {
  Prediction
}