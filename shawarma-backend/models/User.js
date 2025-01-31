import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  credits: { type: Number, default: 0 },
  membership: { type: String, enum: ['Basic', 'Silver', 'Gold', 'VIP'], default: 'Basic' },
  orders: [
    {
      items: [{ name: String, price: Number }],
      totalAmount: Number,
      creditsEarned: Number,
      date: { type: Date, default: Date.now }
    }
  ]
})

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('User', UserSchema)
export default User
