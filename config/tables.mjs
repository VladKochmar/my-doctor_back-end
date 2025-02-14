export default Object.freeze({
  appointments: { primaryKey: 'appointment_id' },
  doctor_schedules: { primaryKey: 'schedule_id' },
  doctor_services: { primaryKey: 'doctor_service_id' },
  favorites: { primaryKey: 'favorite_id' },
  permissions: { primaryKey: 'permission_id' },
  reviews: { primaryKey: 'review_id' },
  roles: { primaryKey: 'role_id' },
  service_templates: { primaryKey: 'template_id' },
  users: { primaryKey: 'user_id' },
})
