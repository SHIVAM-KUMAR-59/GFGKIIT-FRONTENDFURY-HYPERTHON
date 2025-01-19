import User from '@/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const user = await User.findOne({
      email,
    })
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    if (!token) {
      return res.status(500).json({ error: 'Error generating token' })
    }

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      expenseHistory: user.expenseHistory,
    }

    return res
      .status(201)
      .json({
        message: 'User signedin Successfully',
        userWithoutPassword,
        token,
      })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
