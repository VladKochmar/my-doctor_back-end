class AppointmentValidator {
  static appointmentSchema = {
    patient_id: {
      notEmpty: {
        errorMessage: 'Patient ID is required.',
      },
      isInt: {
        errorMessage: 'Patient ID must be an integer.',
      },
    },
    doctor_id: {
      notEmpty: {
        errorMessage: 'Doctor ID is required.',
      },
      isInt: {
        errorMessage: 'Doctor ID must be an integer.',
      },
    },
    doctor_service_id: {
      notEmpty: {
        errorMessage: 'Doctor Service ID is required.',
      },
      isInt: {
        errorMessage: 'Doctor Service ID must be an integer.',
      },
    },
    appointment_date: {
      notEmpty: {
        errorMessage: 'Appointment date is required.',
      },
      isISO8601: {
        errorMessage: 'Appointment date must be a valid ISO 8601 date (e.g., YYYY-MM-DDTHH:mm:ss).',
      },
      custom: {
        options: value => {
          const appointmentDate = new Date(value)
          if (appointmentDate < new Date()) {
            throw new Error('Appointment date must be in the future.')
          }
          return true
        },
      },
    },
    status: {
      notEmpty: {
        errorMessage: 'Status is required.',
      },
      isIn: {
        options: [['pending', 'confirmed', 'completed', 'cancelled']],
        errorMessage: 'Status must be one of the following: pending, confirmed, completed, cancelled.',
      },
    },
  }
}

export default AppointmentValidator
