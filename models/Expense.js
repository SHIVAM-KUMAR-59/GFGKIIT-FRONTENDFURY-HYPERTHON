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
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Expense = mongoose.models.Expense || mongoose.model('User', ExpenseSchema)

export default Expense
