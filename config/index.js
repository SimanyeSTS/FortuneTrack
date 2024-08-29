import { createPool} from "mysql2";
import 'dotenv/config.js'

const connection = createPool({
    host: process.env.hostDb,
    user: process.env.userDb,
    password: process.env.pwDb,
    database: process.env.dbName,
    multipleStatement: true,
    connectionLimit: 5
})

connection.on('connect', (pool) => {
    if (!pool) throw new Error('The database did not respond due to a connection error, please try again later.')
})

export {
    connection
}
