import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// ✅ Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })

    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ✅ Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ✅ Get User Profile (Fix for 404 error)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ✅ Add Credits After Purchase
router.post('/add-credits', authMiddleware, async (req, res) => {
  try {
    const { totalAmount, items } = req.body
    const user = await User.findById(req.user.userId)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const creditsEarned = Math.floor(totalAmount * 0.1) // 10% of total purchase as credits
    user.credits += creditsEarned

    // Add Order to User History
    user.orders.push({ items, totalAmount, creditsEarned, date: new Date() })

    // Upgrade Membership
    if (user.credits >= 500) user.membership = 'VIP'
    else if (user.credits >= 250) user.membership = 'Gold'
    else if (user.credits >= 100) user.membership = 'Silver'

    await user.save()

    res.json({ message: `You've earned ${creditsEarned} credits!`, user })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
