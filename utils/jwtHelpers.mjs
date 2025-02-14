import jwt from 'jsonwebtoken'
import config from '../config/default.mjs'

const expiresIn = config.token.expiredTime
const tokenKey = config.token.tokenKey

export function parseBearer(bearer, headers) {
  console.log('parseBearer')
  let token

  if (bearer.startsWith('Bearer ')) token = bearer.slice(7)

  try {
    const secret = prepareSecret(headers)
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (err) {
    console.log('error', err.message)
    throw new Error('Invalid token')
  }
}

export function prepareToken(data, headers) {
  const token = jwt.sign(data, prepareSecret(headers), { expiresIn })
  const expiresInMs = convertDuration(expiresIn)

  return {
    token,
    expiresInMs,
  }
}

function prepareSecret(headers) {
  return tokenKey + headers['user-agent'] + headers['accept-language']
}

export function convertDuration(durationStr) {
  const timePattern = /^(\d+)([mhdwMy])$/

  const match = durationStr.match(timePattern)

  if (!match) {
    throw new Error('Incorrect time format')
  }

  const value = parseInt(match[1], 10)
  const unit = match[2]

  switch (unit) {
    case 'm':
      return value * 60 * 1000
    case 'h':
      return value * 60 * 60 * 1000
    case 'd':
      return value * 24 * 60 * 60 * 1000
    case 'w':
      return value * 7 * 24 * 60 * 60 * 1000
    case 'M':
      return value * 30.44 * 24 * 60 * 60 * 1000
    case 'y':
      return value * 365.25 * 24 * 60 * 60 * 1000
    default:
      throw new Error('Incorrect unit of measurement')
  }
}
