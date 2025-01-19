import User from '@/models/User'
import bcrypt from 'bcrypt'
import configDB from '@/app/lib/configDB'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  await configDB()
  const { name, username, email, password } = req.body
  if (!name || !email || !password || !username) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    })
    if (user) {
      return res.status(400).json({ error: 'Email or Username already in use' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    if (!token) {
      return res.status(500).json({ error: 'Error generating token' })
    }

    await newUser.save()

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    }
    return res
      .status(201)
      .json({
        message: 'User created successfully',
        userWithoutPassword,
        token,
      })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
