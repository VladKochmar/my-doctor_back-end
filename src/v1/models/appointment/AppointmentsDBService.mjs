import pool from '../../../../db/connectDB.mjs'
import MySQLCRUDManager from '../MySQLCRUDManager.mjs'

class AppointmentsDBService extends MySQLCRUDManager {
  async getAppointmentsByDoctorId(id, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
      SELECT ${fields.join(', ')}
      FROM appointments
      ${joinClause}
      WHERE appointments.doctor_id = ?
    `

    const [rows] = await pool.execute(sql, [id])
    return rows
  }

  async getAppointmentsByPatientId(id, fields = ['*'], joins = []) {
    const joinClause = joins.map(({ table, on }) => `JOIN ${table} ON ${on}`).join(' ')

    const sql = `
      SELECT ${fields.join(', ')}
      FROM appointments
      ${joinClause}
      WHERE appointments.patient_id = ?
    `

    const [rows] = await pool.execute(sql, [id])
    return rows
  }
}

export default new AppointmentsDBService('appointments', 'appointment_id')
