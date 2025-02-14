class ScheduleValidator {
  static scheduleSchema = {
    doctor_id: {
      notEmpty: {
        errorMessage: 'Doctor ID is required.',
      },
      isInt: {
        errorMessage: 'Doctor ID must be an integer.',
      },
    },
    start_time: {
      notEmpty: {
        errorMessage: 'Start time is required.',
      },
      matches: {
        options: /^([01]\d|2[0-3]):([0-5]\d)$/,
        errorMessage: 'Start time must be in HH:mm format.',
      },
    },
    end_time: {
      notEmpty: {
        errorMessage: 'End time is required.',
      },
      matches: {
        options: /^([01]\d|2[0-3]):([0-5]\d)$/,
        errorMessage: 'End time must be in HH:mm format.',
      },
      custom: {
        options: (value, { req }) => {
          const startTime = req.body.start_time

          if (!startTime) throw new Error('Start time must be provided to validate end time.')

          const [startHours, startMinutes] = startTime.split(':').map(Number)
          const [endHours, endMinutes] = value.split(':').map(Number)
          const startTotalMinutes = startHours * 60 + startMinutes
          const endTotalMinutes = endHours * 60 + endMinutes

          if (endTotalMinutes <= startTotalMinutes) throw new Error('End time must be later than start time.')

          return true
        },
      },
    },
  }
}

export default ScheduleValidator
