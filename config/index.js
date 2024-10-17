import { createPool } from "mysql2/promise"
import 'dotenv/config.js'

const connection = createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PW_DB,
  database: process.env.DB_NAME,
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