import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import { config } from './config/index.js'
import authMiddleware from './middleware/authMiddleware.js'


dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user })
})


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
