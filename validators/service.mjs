class ServiceValidator {
  static serviceSchema = {
    service_id: {
      notEmpty: {
        errorMessage: 'Service ID is required.',
      },
      isInt: {
        errorMessage: 'Service ID must be an integer.',
      },
      // custom: {
      //   options: async value => {
      //     // Приклад перевірки доступних `service_id` з бази даних
      //     const validServices = [1, 2, 3, 4] // Замініть на запит до бази
      //     if (!validServices.includes(value)) {
      //       throw new Error('Invalid Service ID.')
      //     }
      //     return true
      //   },
      // },
    },
    custom_price: {
      trim: true,
      escape: true,
      optional: true,
      isFloat: {
        options: { min: 0 },
        errorMessage: 'Custom price must be a positive number.',
      },
    },
    custom_duration: {
      trim: true,
      escape: true,
      optional: true,
      isInt: {
        options: { min: 1 },
        errorMessage: 'Custom duration must be a positive integer.',
      },
    },
    custom_description: {
      trim: true,
      escape: true,
      optional: true,
      isString: {
        errorMessage: 'Custom description must be a string.',
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Custom description must not exceed 255 characters.',
      },
    },
  }
}

export default ServiceValidator
