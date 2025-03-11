class ScheduleValidator {
  static scheduleSchema = {
    'schedules.*.day_of_week': {
      notEmpty: {
        errorMessage: 'Day of week is required.',
      },
      isIn: {
        options: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']],
        errorMessage: 'Invalid day of the week.',
      },
    },
    'schedules.*.start_time': {
      notEmpty: {
        errorMessage: 'Start time is required.',
      },
      matches: {
        options: /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        errorMessage: 'Start time must be in HH:mm or HH:mm:ss format.',
      },
    },
    'schedules.*.end_time': {
      notEmpty: {
        errorMessage: 'End time is required.',
      },
      matches: {
        options: /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
        errorMessage: 'End time must be in HH:mm or HH:mm:ss format.',
      },
      custom: {
        options: (value, { req }) => {
          const schedules = req.body.schedules
          schedules.forEach(schedule => {
            const startTime = schedule.start_time
            const parseTime = time => {
              const [hours, minutes] = time.split(':').map(Number)
              return hours * 60 + minutes
            }
            if (parseTime(value) <= parseTime(startTime)) {
              throw new Error('End time must be later than start time.')
            }
          })
          return true
        },
      },
    },
  }
}

export default ScheduleValidator
