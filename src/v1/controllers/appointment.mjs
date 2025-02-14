import AppointmentsDBService from '../models/appointment/AppointmentsDBService.mjs'
import modelConfigs from '../models/configs.mjs'

const { appointments } = modelConfigs

class AppointmentController {
  static async getAppointmentsByDoctorId(req, res) {
    try {
      const id = req.params.id
      const fields = appointments.fields.concat(appointments.doctor.fields)
      const joins = appointments.joins.concat(appointments.doctor.joins)
      const appointmentsData = await AppointmentsDBService.getAppointmentsByDoctorId(id, fields, joins)

      res.status(200).json({
        data: appointmentsData,
      })
    } catch (err) {
      res.status(500).json({ error: "Error fetching doctor's appointments", message: err.message })
    }
  }

  static async getAppointmentsByPatientId(req, res) {
    try {
      const id = req.params.id
      const fields = appointments.fields.concat(appointments.patient.fields)
      const joins = appointments.joins.concat(appointments.patient.joins)
      const appointmentsData = await AppointmentsDBService.getAppointmentsByPatientId(id, fields, joins)

      res.status(200).json({
        data: appointmentsData,
      })
    } catch (err) {
      res.status(500).json({ error: "Error fetching patient's appointments", message: err.message })
    }
  }

  static async getAppointmentById(req, res) {
    try {
      const id = req.params.id
      const fields = appointments.fields.concat(appointments.doctor.fields, appointments.patient.fields)
      const joins = appointments.joins.concat(appointments.doctor.joins, appointments.patient.joins)
      const appointmentData = await AppointmentsDBService.findById(id, fields, joins)

      res.status(200).json({
        data: appointmentData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching appointment', message: err.message })
    }
  }

  static async deleteAppointment(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    try {
      await AppointmentsDBService.deleteById(req.body.id)
      res.status(200).json({ message: 'Review deleted' })
    } catch (err) {
      res.status(500).json({ error: 'Error deleting appointment' })
    }
  }
}

export default AppointmentController
