import UserController from '../controllers/user.mjs'
import { checkSchema } from 'express-validator'
import UserValidator from '../../../validators/user.mjs'
import upload from '../../../utils/UploadManager.mjs'

import { Router } from 'express'
import UploadManager from '../../../utils/UploadManagerForFile.mjs'
const router = Router()

router.get('/doctors', UserController.getDoctorsList)
router.get('/doctors/:id', UserController.getDoctorById)

router.get('/me', UserController.getProfile)

router.get('/:id', UserController.getUserById)
router.get('/', UserController.getUsersList)

router.post('/update', UploadManager.getUploadStorage().single('avatar'), checkSchema(UserValidator.userSchema), UserController.updateUser)

router.delete('/', UserController.deleteUser)

export default router
