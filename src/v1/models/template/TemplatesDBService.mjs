import MySQLCRUDManager from '../MySQLCRUDManager.mjs'

const TemplatesDBService = new MySQLCRUDManager('service_templates', 'template_id')

export default TemplatesDBService
