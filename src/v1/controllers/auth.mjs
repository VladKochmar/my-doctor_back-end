import UsersDBService from '../models/user/UsersDBService.mjs'
import { validatePassword, hashPassword } from '../../../utils/authHelpers.mjs'
import { prepareToken } from '../../../utils/jwtHelpers.mjs'
import { validationResult } from 'express-validator'

class AuthController {
  static async signup(req, res) {
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
      const hashedPassword = await hashPassword(req.body.password)

      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role_id: req.body.role_id,
        bio: null,
        phone_number: null,
      }
      const userId = await UsersDBService.create(userData)
      console.log('req.body', req.body)
      console.log('userId', userId)
      console.log('req.body.name', req.body.name)
      console.log('req.body.role', req.body.role_id)

      const tokenData = prepareToken({ id: userId, name: req.body.name, role_id: req.body.role_id }, req.headers)

      res.status(201).json({
        result: 'Signed up successfully',
        user: { id: userId, name: userData.name, email: userData.email, role_id: userData.role_id, avatar: null, phone_number: null, bio: null },
        tokenData,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Signup error' })
    }
  }

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: 'Email is required' })
    }

    if (!req.body.password) {
      return res.status(401).json({ error: 'Password is required' })
    }

    try {
      const user = await UsersDBService.findByEmail(req.body.email)

      if (!user) return res.status(401).json({ error: 'User not found' })

      if (!(await validatePassword(req.body.password, user.password))) {
        return res.status(401).json({ error: 'Wron password' })
      }

      console.log('user.id', user.id)
      console.log('user.name', user.name)
      console.log('user.role_id', user.role_id)

      const tokenData = prepareToken({ id: user.id, role_id: user.role_id }, req.headers)

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role_id: user.role_id,
        bio: user.bio,
        phone_number: user.phone_number,
      }

      res.status(201).json({
        result: 'Authorized',
        user: userData,
        tokenData,
      })
    } catch (err) {
      console.log(err)
      res.status(401).json({ error: 'Log in error' })
    }
  }
}

export default AuthController
