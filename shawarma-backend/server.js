import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js' 
import authMiddleware from './middleware/authMiddleware.js'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' })) // Adjust frontend URL
app.use(cookieParser())

// ✅ Add the auth routes to express
app.use('/api/auth', authRoutes)

// ✅ Protected Test Route (For debugging in Postman)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user })
})

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
