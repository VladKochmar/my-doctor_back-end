import pool from '../../../../db/connectDB.mjs'
import MySQLCRUDManager from '../MySQLCRUDManager.mjs'

class DoctorServicesDBService extends MySQLCRUDManager {
  async getServicesByDoctorId(id, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
      SELECT ${fields.join(', ')}
      FROM doctor_services
      ${joinClause}
      WHERE doctor_id = ?
    `

    const [rows] = await pool.execute(sql, [id])
    return rows
  }
}

export default new DoctorServicesDBService('doctor_services', 'doctor_service_id')
