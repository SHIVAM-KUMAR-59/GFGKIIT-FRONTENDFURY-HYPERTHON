import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (value) {
        if (!this.isOAuth && (!value || value.length < 8)) {
          return false
        }
        return true
      },
      message: 'Password is required and must be at least 8 characters long.',
    },
  },

  expenseHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isOAuth: { type: Boolean, default: false },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
