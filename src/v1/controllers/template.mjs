import TemplatesDBService from '../models/template/TemplatesDBService.mjs'
import modelConfigs from '../models/configs.mjs'

const { service_templates } = modelConfigs

class TemplateController {
  static async getTemplatesList(req, res) {
    try {
      const templatesData = await TemplatesDBService.findManyWithSearchOptions(req.query, service_templates.filters)
      res.status(200).json({
        data: templatesData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching templates', message: err.message })
    }
  }

  static async getTemplatesNamesList(req, res) {
    try {
      const templatesNamesData = await TemplatesDBService.findManyWithSearchOptions(req.query, service_templates.filters, ['template_id', 'name'])
      res.status(200).json({
        data: templatesNamesData,
      })
    } catch (err) {
      res.status(500).json({ error: 'Error fetching names', message: err.message })
    }
  }

  static async getTemplateById(req, res) {
    try {
      const id = req.params.id
      const templateData = await TemplatesDBService.findById(id)

      res.status(200).json({
        data: templateData,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default TemplateController
