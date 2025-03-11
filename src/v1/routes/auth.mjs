import { checkSchema } from 'express-validator'
import AuthController from '../controllers/auth.mjs'
import UserValidator from '../../../validators/user.mjs'

import { Router } from 'express'
const router = Router()

router.post('/login', checkSchema(UserValidator.logInSchema), AuthController.login)

router.post('/signup', checkSchema(UserValidator.signUpSchema), AuthController.signup)

export default router
