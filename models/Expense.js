import mongoose from 'mongoose'

const ExpenseSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
  },
  category: {
    type: String,
    enum: [
      'housing',
      'transportation',
      'food',
      'personal and health',
      'entertainment and leisure',
      'savings and debt',
    ],
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Expense = mongoose.models.Expense || mongoose.model('User', ExpenseSchema)

export default Expense
