import pool from '../../../../db/connectDB.mjs'
import MySQLCRUDManager from '../MySQLCRUDManager.mjs'

class SchedulesDBService extends MySQLCRUDManager {
  async getSchedulesByDoctorId(id) {
    const sql = `
    SELECT *
    FROM doctor_schedules
    WHERE doctor_id = ?
    `

    const [rows] = await pool.execute(sql, [id])
    return rows
  }

  /**
   * Add new array of doctor's schedules
   * @param {number} doctorId - Doctor's ID
   * @param {Array} schedules - Array of schedules
   */
  async createBulk(doctorId, schedules) {
    const sql = `
      INSERT INTO ${this.tableName} (doctor_id, day_of_week, start_time, end_time)
      VALUES ${schedules.map(() => '(?, ?, ?, ?)').join(', ')}
    `

    const values = schedules.flatMap(schedule => [doctorId, schedule.day_of_week, schedule.start_time, schedule.end_time])

    await pool.execute(sql, values)
  }

  /**
   * Delete all schedules for a doctor
   * @param {number} doctorId - Doctor's ID
   */
  async deleteByDoctorId(doctorId) {
    const sql = `DELETE FROM ${this.tableName} WHERE doctor_id = ?`
    await pool.execute(sql, [doctorId])
  }
}

export default new SchedulesDBService('doctor_schedules', 'schedule_id')
