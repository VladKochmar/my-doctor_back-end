class UserValidator {
  static logInSchema = {
    email: {
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
      trim: true,
      escape: true,
    },
    password: {
      trim: true,
      escape: true,
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password must be at least 8 characters long',
      },
      matches: {
        options: /[a-zA-Z]/,
        errorMessage: 'Password must contain at least one letter.',
      },
      custom: {
        options: value => /\d/.test(value),
        errorMessage: 'Password must contain at least one number',
      },
    },
  }
  static signUpSchema = {
    name: {
      trim: true,
      escape: true,
      notEmpty: {
        errorMessage: 'Name is required',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
      trim: true,
      escape: true,
    },
    password: {
      trim: true,
      escape: true,
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password must be at least 8 characters long',
      },
      matches: {
        options: /[a-zA-Z]/,
        errorMessage: 'Password must contain at least one letter.',
      },
      custom: {
        options: value => /\d/.test(value),
        errorMessage: 'Password must contain at least one number',
      },
    },
    role_id: {
      notEmpty: {
        errorMessage: 'Role is required.',
      },
      isInt: {
        errorMessage: 'Role ID must be an integer.',
      },
      // custom: {
      //   options: value => {
      //     const validRoles = [1, 2, 3] // Замінити на запит до DB
      //     return validRoles.includes(value)
      //   },
      //   errorMessage: 'Invalid Role ID.',
      // },
    },
  }
  static userSchema = {
    name: {
      trim: true,
      escape: true,
      notEmpty: {
        errorMessage: 'Name is required',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'Invalid email address',
      },
      normalizeEmail: true,
      trim: true,
      escape: true,
    },
    phone_number: {
      optional: true,
    },
    avatar: {
      optional: true,
    },
    bio: {
      optional: true,
    },
  }
}

export default UserValidator
