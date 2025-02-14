import session from 'express-session'
import config from './default.mjs'

const sessionConfig = session({
  secret: config.session.sekretKey,
  saveUninitialized: false,
  resave: false,
})

export default sessionConfig
