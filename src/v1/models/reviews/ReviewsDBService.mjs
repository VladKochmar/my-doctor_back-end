import pool from '../../../../db/connectDB.mjs'
import MySQLCRUDManager from '../MySQLCRUDManager.mjs'

class ReviewsDBService extends MySQLCRUDManager {
  async getReviewsByPatientId(id, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
    SELECT ${fields.join(', ')}
    FROM reviews
    ${joinClause}
    WHERE reviews.patient_id = ?
    `

    const [rows] = await pool.execute(sql, [id])
    return rows
  }

  async getReviewsByDoctorId(id, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
    SELECT ${fields.join(', ')}
    FROM reviews
    ${joinClause}
    WHERE reviews.doctor_id = ?
    `

    const [rows] = await pool.execute(sql, [id])
    return rows
  }
}

export default new ReviewsDBService('reviews', 'review_id')
