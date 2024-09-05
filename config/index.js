import { createPool } from "mysql2/promise"
import 'dotenv/config.js'

const connection = createPool({
  host: process.env.hostDb,
  user: process.env.userDb,
  password: process.env.pwDb,
  database: process.env.dbName,
  multipleStatements: true,
  connectionLimit: 5,
  namedPlaceholders: true
})

connection.on('error', (err) => {
  throw new Error(`Database connection error: ${err.message}`)
})

connection.on('connection', () => {
})

export {
  connection
}