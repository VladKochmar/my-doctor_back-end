import { validationResult } from 'express-validator'
import SchedulesDBService from '../models/schedule/SchedulesDBService.mjs'

class ScheduleController {
  static async getDoctorsSchedule(req, res) {
    try {
      if (!req.user) {
        return res.status(403).json({ error: 'Access denied' })
      }

      const id = req.user.id
      const schedulesData = await SchedulesDBService.getSchedulesByDoctorId(id)

      res.status(200).json({
        data: schedulesData,
      })
    } catch (err) {
      res.status(500).json({ error: "Error fetching doctor's schedule" })
    }
  }

  static async getSchedulesByDoctorId(req, res) {
    try {
      const id = req.params.id
      const schedulesData = await SchedulesDBService.getSchedulesByDoctorId(id)

      res.status(200).json({
        data: schedulesData,
      })
    } catch (err) {
      res.status(500).json({ error: "Error fetching doctor's schedule" })
    }
  }

  static async createSchedule(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const formattedErrors = {}

      errors.array().forEach(error => {
        if (formattedErrors[error.path]) {
          formattedErrors[error.path].push(error.msg)
        } else {
          formattedErrors[error.path] = [error.msg]
        }
      })

      return res.status(400).json({
        errors: formattedErrors,
      })
    }

    try {
      const { schedules } = req.body
      const doctorId = req.user.id

      if (!Array.isArray(schedules) || schedules.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'Schedules array is required' }] })
      }

      await SchedulesDBService.deleteByDoctorId(doctorId)

      await SchedulesDBService.createBulk(doctorId, schedules)

      res.status(200).json({ message: 'Schedule updated successfully' })
    } catch (err) {
      res.status(500).json({
        errors: [{ msg: err.message }],
      })
    }
  }

  static async deleteSchedule(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    try {
      await SchedulesDBService.deleteById(req.body.id)
      res.status(200).json({ message: 'Review deleted' })
    } catch (err) {
      res.status(500).json({ error: 'Error deleting schedule' })
    }
  }
}

export default ScheduleController
