import TemplateController from '../controllers/template.mjs'

import { Router } from 'express'
const router = Router()

router.get('/names', TemplateController.getTemplatesNamesList)

router.get('/', TemplateController.getTemplatesList)
router.get('/:id', TemplateController.getTemplateById)

export default router
