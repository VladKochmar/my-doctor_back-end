import AppointmentController from '../controllers/appointment.mjs'

import { Router } from 'express'
const router = Router()

router.get('/:id', AppointmentController.getAppointmentById)

router.get('/doctor/:id', AppointmentController.getAppointmentsByDoctorId)
router.get('/patient/:id', AppointmentController.getAppointmentsByPatientId)

router.delete('/', AppointmentController.deleteAppointment)

export default router
