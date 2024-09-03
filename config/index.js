import { createPool } from "mysql2/promise"
import 'dotenv/config.js'

const connection = createPool({
    host: process.env.hostDb,
    user: process.env.userDb,
    password: process.env.pwDb,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 5
})

connection.on('error', (err) => {
    console.error('Database connection error:', err)
})
  
connection.on('connection', () => {
    console.log('Database connection established')
})

export {
    connection
}