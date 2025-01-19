import jwt from 'jsonwebtoken'

const verifyToken = (handler) => {
  return async (req, res) => {
    // Check if the Authorization header is present
    const token = req.headers.authorization?.split(' ')[1] // Extract token from 'Bearer <token>'

    const JWT_SECRET = process.env.JWT_SECRET

    if (!token) {
      console.log('No token')
      return res.status(401).json({ message: 'Authorization token is missing' })
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, JWT_SECRET) // Verifies the token and decodes the payload

      // You can attach the user data from the decoded token to the request object
      req.user = decoded // The decoded token will contain the user info (e.g., user id)

      // Continue to the next middleware/handler
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}

export default verifyToken
