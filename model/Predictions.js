import { connection as db } from '../config/index.js';

class Prediction {
  static async getAll(type) {
    try {
      const query = type ? `
      SELECT id, type, symbol, open, high, low, average, status, month FROM predictions WHERE type = ?;
      ` : `
      SELECT id, type, symbol, open, high, low, average, status, month FROM predictions
      ;`
      const [predictions] = await db.execute(query, type)
      return predictions
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async getByType(type) {
    try {
      const query = `
      SELECT id, type, symbol, open, high, low, average, status, month 
      FROM predictions WHERE type = ?;
      `
      const [predictions] = await db.execute(query, [type])
      return predictions
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async getById(id) {
    try {
      const query = `
      SELECT id, type, symbol, open, high, low, average, status, month FROM predictions WHERE id = ?;
      `
      const [prediction] = await db.execute(query, [id])
      return prediction
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async create(prediction) {
    try {
      const query = `
      INSERT INTO predictions SET ?;
      `
      const [result] = await db.execute(query, [prediction])
      return result.insertId
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async update(id, prediction) {
    try {
      const query = `
      UPDATE predictions SET ? WHERE id = ?;
      `
      await db.execute(query, [prediction, id])
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  static async delete(id) {
    try {
      const query = `
      DELETE FROM predictions WHERE id = ?;
      `
      await db.execute(query, [id])
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export {
  Prediction
}