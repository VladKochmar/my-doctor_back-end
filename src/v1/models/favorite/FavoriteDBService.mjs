import MySQLCRUDManager from '../MySQLCRUDManager.mjs'
import pool from '../../../../db/connectDB.mjs'

class FavoriteDBService extends MySQLCRUDManager {
  async getPatientFavorites(patientId, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
      SELECT ${fields.join(', ')}
      FROM favorites
      ${joinClause}
      WHERE patient_id = ?
    `

    const [rows] = await pool.execute(sql, [patientId])
    return rows
  }
}

export default new FavoriteDBService('favorites', 'favorite_id')
