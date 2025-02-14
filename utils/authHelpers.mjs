import bcrypt from 'bcryptjs'

/**
 * Validates a given password against a hashed password.
 * @param {string} password - The plain text password to validate.
 * @param {string} hash - The hashed password to compare against.
 * @returns {boolean} - Resolves to `true` if the password matches the hash, otherwise `false`.
 */
export async function validatePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash)
  return isMatch
}

/**
 * Generates a secure hashed version of a plain text password.
 * @param {string} password - The plain text password to be hashed.
 * @returns {string} - Resolves to the hashed password as a string.
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}
