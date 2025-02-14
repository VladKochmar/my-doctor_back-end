import { checkSchema } from 'express-validator'
import ScheduleValidator from '../../../validators/schedule.mjs'
import ScheduleController from '../controllers/schedule.mjs'

import { Router } from 'express'
const router = Router()

router.get('/doctor/:id', ScheduleController.getSchedulesByDoctorId)

router.post('/update', checkSchema(ScheduleValidator.scheduleSchema), ScheduleController.createSchedule)

router.delete('/', ScheduleController.deleteSchedule)

export default router
