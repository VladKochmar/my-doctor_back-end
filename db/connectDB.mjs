import config from '../config/default.mjs'
import mysql from 'mysql2/promise'

async function connectMySql() {
  try {
    const pool = mysql.createPool({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
    })
    console.log('Successfully connected to MySQL')
    return pool
  } catch (err) {
    console.error('Error connecting to MySQL:', err)
  }
}

const pool = await connectMySql()

export default pool
