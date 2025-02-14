import { checkSchema } from 'express-validator'
import ServiceValidator from '../../../validators/service.mjs'
import DoctorServiceController from '../controllers/service.mjs'

import { Router } from 'express'
const router = Router()

router.get('/doctor/:id', DoctorServiceController.getServicesByDoctorId)

router.get('/my', DoctorServiceController.getDoctorsServices)

router.get('/', DoctorServiceController.getServicesList)
router.get('/:id', DoctorServiceController.getServiceById)

router.get('/form/:id?', DoctorServiceController.serviceForm)
router.post('/form/:id?', checkSchema(ServiceValidator.serviceSchema), DoctorServiceController.registerService)

router.delete('/', DoctorServiceController.deleteService)

export default router
