import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../')

export default Object.freeze({
  port: process.env.PORT,
  database: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    name: process.env.SQL_DATABASE,
  },
  session: {
    sekretKey: process.env.SEKRET_KEY,
  },
  token: {
    tokenKey: process.env.TOKEN_KEY,
    expiredTime: process.env.EXPIRE_PERIOD,
  },
  email: {
    user: process.env.MAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  rootDir: rootDir,
})
