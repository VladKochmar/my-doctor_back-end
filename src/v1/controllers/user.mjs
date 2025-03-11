import UsersDBService from '../models/user/UsersDBService.mjs'
import modelConfigs from '../models/configs.mjs'
import { validationResult } from 'express-validator'
import fs from 'fs'
import path from 'path'
import config from '../../../config/default.mjs'

const { users } = modelConfigs

class UserController {
  static async getUsersList(req, res) {
    try {
      const usersData = await UsersDBService.findManyWithSearchOptions(req.query, users.filters, users.fields)
      res.status(200).json({
        data: usersData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching users' })
    }
  }

  static async getProfile(req, res) {
    try {
      if (!req.user) {
        return res.status(403).json({ error: 'Access denied' })
      }

      const id = req.user.id
      const user = await UsersDBService.findById(id, users.fields)

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json({
        user,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching profile' })
    }
  }

  static async getUserById(req, res) {
    try {
      const id = req.params.id
      const userData = await UsersDBService.findById(id, users.fields)

      if (!userData) {
        res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json({
        data: userData,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getDoctorsList(req, res) {
    try {
      const doctrosData = await UsersDBService.getDoctorsList(users.fields)

      res.status(200).json({
        data: doctrosData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching doctors', message: err.message })
    }
  }

  static async getDoctorById(req, res) {
    try {
      const id = req.params.id
      const doctorData = await UsersDBService.getDoctorById(id, users.fields)

      res.status(200).json({
        data: doctorData,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async updateUser(req, res) {
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
      const id = req.user.id
      const userData = req.body

      const currentUser = await UsersDBService.findById(id, ['avatar', 'role_id'])
      const currentAvatar = currentUser.avatar

      const currentRoleId = currentUser.role_id
      userData.role_id = currentRoleId

      if (req.file?.filename || userData.avatar === '') {
        userData.avatar = req.file?.filename ? req.file?.filename : null

        if (currentAvatar) {
          fs.unlinkSync(path.join(config.rootDir, `uploads\\${currentAvatar}`))
        }
      }

      await UsersDBService.update(id, userData)

      res.status(200).json({ message: 'User updated successfully', user: userData })
    } catch (err) {
      console.log('err', err)
      res.status(500).json({
        error: err.message,
      })
    }
  }

  static async deleteUser(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    try {
      const id = req.user.id
      const user = await UsersDBService.findById(id, ['avatar'])

      if (user.avatar) {
        fs.unlinkSync(path.join(config.rootDir, `uploads\\${user.avatar}`))
      }

      await UsersDBService.deleteById(id)
      res.status(200).json({ message: 'User deleted' })
    } catch (err) {
      res.status(500).json({ error: 'Error deleting user' })
    }
  }
}

export default UserController
