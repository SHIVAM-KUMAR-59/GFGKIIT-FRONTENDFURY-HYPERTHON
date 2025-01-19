import jwt from 'jsonwebtoken'
import verifyToken from '@/middleware/verifyToken' // Import the verifyToken utility
import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import Expense from '@/models/Expense'

const handler = async (req, res) => {
  await configDB()

  if (req.method === 'POST') {
    console.log('Hit')
    const { amount, description, category } = req.body
    if (!amount || !description || !category) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      // You can access the user from the decoded token here
      console.log('Authenticated user:', req.user)

      // Add your payment processing logic here
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

      // Example response after processing payment
      return res.status(200).json({ message: 'Payment created successfully' })
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
