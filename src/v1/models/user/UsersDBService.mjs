import pool from '../../../../db/connectDB.mjs'
import MySQLCRUDManager from '../MySQLCRUDManager.mjs'

class UsersDBService extends MySQLCRUDManager {
  async findByEmail(email) {
    const sql = `
      SELECT 
        user_id AS id,
        name,
        avatar,
        email, 
        password,
        role_id,
        phone_number,
        bio
      FROM users
      WHERE email = ?
      LIMIT 1
    `

    const [rows] = await pool.execute(sql, [email])
    return rows[0] || null
  }

  async getDoctorsList(fields = ['*']) {
    const sql = `
      SELECT 
      ${fields.join(', ')},
      AVG(reviews.rating) AS average_rating
      FROM users
      LEFT JOIN reviews ON reviews.doctor_id = user_id
      WHERE role_id = 1
      GROUP BY user_id, role_id, name, phone_number, avatar, email, bio;
    `

    const [rows] = await pool.execute(sql)
    return rows
  }

  async getDoctorById(id, fields = ['*']) {
    const sql = `
      SELECT 
      ${fields.join(', ')},
      AVG(reviews.rating) AS average_rating
      FROM users
      LEFT JOIN reviews ON reviews.doctor_id = user_id
      WHERE user_id = ?
      GROUP BY user_id, role_id, name, phone_number, avatar, email, bio;
    `

    const [rows] = await pool.execute(sql, [id])
    return rows[0] || null
  }
}

export default new UsersDBService('users', 'user_id')
