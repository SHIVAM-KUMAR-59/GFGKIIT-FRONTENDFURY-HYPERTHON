import jwt from 'jsonwebtoken'
import verifyToken from '@/middleware/verifyToken' // Import the verifyToken utility
import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import Expense from '@/models/Expense'

const handler = async (req, res) => {
  await configDB()

  if (req.method === 'POST') {
    const { amount, description, category } = req.body
    if (!amount || !description || !category) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const user = await User.findById(req.user.id)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const expense = new Expense({
        createdBy: user._id,
        amount,
        description,
        category,
      })

      user.expenseHistory.push(expense._id)

      await user.save()

      await expense.save()

      return res
        .status(201)
        .json({
          message: 'Payment created successfully',
          expense,
          success: true,
        })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error creating payment' })
    }
  } else {
    return res.status(400).json({ error: 'Method not allowed' })
  }
}

// Wrap the handler with the verifyToken middleware
export default verifyToken(handler)
