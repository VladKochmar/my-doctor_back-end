import DoctorServicesDBService from '../models/services/DoctorServicesDBService.mjs'
import modelConfigs from '../models/configs.mjs'
import { validationResult } from 'express-validator'

const { doctor_services } = modelConfigs

class DoctorServiceController {
  static async getServicesList(req, res) {
    try {
      const servicesData = await DoctorServicesDBService.findManyWithSearchOptions(
        req.query,
        doctor_services.filters,
        doctor_services.fields,
        doctor_services.joins
      )
      res.status(200).json({
        data: servicesData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching services', message: err.message })
    }
  }

  static async getServiceById(req, res) {
    try {
      const id = req.params.id
      const serviceData = await DoctorServicesDBService.findById(id, doctor_services.fields, doctor_services.joins)

      res.status(200).json({
        data: serviceData,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getServicesByDoctorId(req, res) {
    try {
      const id = req.params.id
      const servciesData = await DoctorServicesDBService.getServicesByDoctorId(id, doctor_services.fields, doctor_services.joins)

      res.status(200).json({
        data: servciesData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching services', message: err.message })
    }
  }

  static async getDoctorsServices(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    try {
      const id = req.user.id
      const servciesData = await DoctorServicesDBService.getServicesByDoctorId(id, doctor_services.fields, doctor_services.joins)

      res.status(200).json({
        data: servciesData,
      })
    } catch (err) {
      res.status(500).json({ error: "Error fetching doctor's services", message: err.message })
    }
  }

  static async serviceForm(req, res) {
    try {
      if (!req.user) {
        return res.status(403).json({ error: 'Access denied' })
      }

      const id = req.params.id
      let service = null

      if (id) {
        service = await DoctorServicesDBService.findById(id, doctor_services.fields, doctor_services.joins)
      }

      res.status(200).json({
        errors: [],
        data: service,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async registerService(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const formattedErrors = {}
      errors.array().forEach(error => {
        formattedErrors[error.path] = error.msg
      })

      return res.status(400).json({
        errors: formattedErrors,
      })
    }

    try {
      const serviceData = req.body
      serviceData.doctor_id = parseInt(req.user.id)

      if (req.params.id) {
        await DoctorServicesDBService.update(req.params.id, serviceData)
      } else {
        await DoctorServicesDBService.create(serviceData)
      }

      res.status(200).json({ message: `Service ${req.params.id ? 'updated' : 'registered'} successfully` })
    } catch (err) {
      res.status(500).json({
        errors: [{ msg: err.message }],
      })
    }
  }

  static async deleteService(req, res) {
    if (!req.user) {
      return res.status(403).json({ error: 'Access denied' })
    }

    try {
      await DoctorServicesDBService.deleteById(req.body.id)
      res.status(200).json({ id: req.body.id, message: 'Service deleted' })
    } catch (err) {
      console.log('err', err)
      res.status(500).json({ error: 'Error deleting service' })
    }
  }
}

export default DoctorServiceController
