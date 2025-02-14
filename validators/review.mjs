class ReviewValidator {
  static reviewSchema = {
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
    appointment_id: {
      notEmpty: {
        errorMessage: 'Appointment ID is required.',
      },
      isInt: {
        errorMessage: 'Appointment ID must be an integer.',
      },
      custom: {
        options: async value => {
          // Приклад перевірки: чи існує запис на прийом у базі
          const appointmentExists = true // Замість цього виконайте реальний запит
          if (!appointmentExists) {
            throw new Error('Appointment does not exist.')
          }
          return true
        },
      },
    },
    rating: {
      notEmpty: {
        errorMessage: 'Rating is required.',
      },
      isInt: {
        errorMessage: 'Rating must be an integer.',
      },
      custom: {
        options: value => {
          if (value < 1 || value > 5) {
            throw new Error('Rating must be between 1 and 5.')
          }
          return true
        },
      },
    },
    comment: {
      trim: true,
      escape: true,
      optional: true,
      isString: {
        errorMessage: 'Comment must be a string.',
      },
      isLength: {
        options: { max: 500 },
        errorMessage: 'Comment must not exceed 500 characters.',
      },
    },
  }
}

export default ReviewValidator
