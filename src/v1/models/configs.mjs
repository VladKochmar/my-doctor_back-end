export default Object.freeze({
  users: {
    filters: [{ fieldName: 'name', filterCategory: 'search' }],
    fields: ['user_id AS id', 'role_id', 'name', 'phone_number', 'avatar', 'email', 'bio'],
    joins: [],
  },
  service_templates: {
    filters: [
      {
        fieldName: 'name',
        filterCategory: 'search',
      },
      {
        fieldName: 'default_description',
        filterCategory: 'search',
      },
      {
        fieldName: 'default_duration',
        filterCategory: 'range',
      },
      {
        fieldName: 'default_price',
        filterCategory: 'range',
      },
    ],
    fields: ['*'],
    joins: [],
  },
  role_permissions: {
    filters: ['r.role_name AS role', 'p.permission_name AS permission'],
    fields: [],
    joins: [
      { table: 'roles AS r', on: 'role_permissions.role_id = r.role_id' },
      { table: 'permissions AS p', on: 'role_permissions.permissions_id = p.permission_id' },
    ],
  },
  roles: {
    filters: [],
    fields: ['*'],
    joins: [],
  },
  reviews: {
    filters: [{ fieldName: 'rating', filterCategory: 'range' }],
    fields: [
      'review_id AS id',
      'p.name AS patient_name',
      'p.email AS patient_email',
      'p.avatar AS patient_avatar',
      'd.name AS doctor_name',
      'd.email AS doctor_email',
      'a.appointment_date',
      'rating',
      'comment',
      'reviews.created_at',
      'st.name AS service_title',
    ],
    joins: [
      { table: 'users AS p', on: 'p.user_id = reviews.patient_id' },
      { table: 'users AS d', on: 'd.user_id = reviews.doctor_id' },
      { table: 'appointments AS a', on: 'a.appointment_id = reviews.appointment_id' },
      { table: 'doctor_services AS ds', on: 'ds.doctor_service_id = a.doctor_service_id' },
      { table: 'service_templates AS st', on: 'st.template_id = ds.service_id' },
    ],
  },
  permissions: {
    filters: [],
    fields: ['*'],
    joins: [],
  },
  favorites: {
    filters: [],
    fields: ['favorite_id AS id', 'd.name', 'd.avatar', 'd.bio', 'd.email'],
    joins: [{ table: 'users AS d', on: 'd.user_id = doctor_id' }],
  },
  doctor_services: {
    filters: [
      {
        fieldName: 'st.name',
        filterCategory: 'search',
      },
      {
        fieldName: 'custom_description',
        filterCategory: 'search',
      },
      {
        fieldName: 'custom_duration',
        filterCategory: 'range',
      },
      {
        fieldName: 'custom_price',
        filterCategory: 'range',
      },
      {
        fieldName: 'service_id',
        filterCategory: 'list',
      },
    ],
    fields: [
      'doctor_service_id AS id',
      'd.name AS doctor_name',
      'st.name AS title',
      'service_id',
      'COALESCE(custom_price, st.default_price) AS price',
      'COALESCE(custom_duration, st.default_duration) AS duration',
      'COALESCE(custom_description, st.default_description) AS description',
    ],
    joins: [
      { table: 'users AS d', on: 'd.user_id = doctor_id' },
      { table: 'service_templates AS st', on: 'st.template_id = service_id' },
    ],
  },
  doctor_schedules: {
    filters: [],
    fields: ['*'],
    joins: [],
  },
  appointments: {
    filters: [],
    fields: [
      'appointment_id AS id',
      'st.name AS title',
      'COALESCE(ds.custom_price, st.default_price) AS service_price',
      'COALESCE(ds.custom_duration, st.default_duration) AS service_duration',
      'COALESCE(ds.custom_description, st.default_description) AS service_description',
      'appointment_date',
      'status',
    ],
    joins: [
      { table: 'doctor_services AS ds', on: 'ds.doctor_service_id = doctor_service_id' },
      { table: 'service_templates AS st', on: 'st.service_id = ds.service_id' },
    ],
    patient: {
      fields: ['d.name AS doctor_name', 'd.email AS doctor_email'],
      joins: [{ table: 'users AS d', on: 'd.user_id = appointments.doctor_id' }],
    },
    doctor: {
      fields: ['p.name AS patient_name', 'p.email AS patient_email'],
      joins: [{ table: 'users AS p', on: 'p.user_id = appointments.patient_id' }],
    },
  },
})
