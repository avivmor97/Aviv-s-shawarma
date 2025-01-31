import express from 'express'
import User from '../models/User.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Get User Profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Add Credits After Purchase
router.post('/add-credits', authMiddleware, async (req, res) => {
  try {
    const { totalAmount, items } = req.body
    const user = await User.findById(req.user.userId)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const creditsEarned = Math.floor(totalAmount * 0.1) // 10% of purchase as credits
    user.credits += creditsEarned

    // Add Order to User History
    user.orders.push({ items, totalAmount, creditsEarned })

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
