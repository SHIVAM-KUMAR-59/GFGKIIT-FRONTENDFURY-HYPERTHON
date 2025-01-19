import verifyToken from '@/middleware/verifyToken'
import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import Expense from '@/models/Expense'

const handler = async (req, res) => {
  await configDB()

  if (req.method === 'GET') {
    console.log('Hit')
    try {
      const user = await User.findById(req.user.id).populate('expenseHistory')
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      console.log(user)
      return res.status(200).json({ message: 'Payments Fetched', user })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Error creating payment' })
    }
  } else {
    return res.status(400).json({ error: 'Method not allowed' })
  }
}

export default verifyToken(handler)
