import express from 'express'
import {
  signup,
  signin,
  updateUser,
  deleteUser,
  getUserProfile,
  getAllUsers,
} from '../controllers/auth.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// Signup route
router.post('/signup', signup)

// Signin route
router.post('/signin', signin)
// Update user
router.put('/update/:id', verifyToken, updateUser)
// Delete user route
router.delete('/delete/:id', verifyToken, deleteUser)

// Get user profile route
router.get('/profile/:id', verifyToken, getUserProfile)

// Get all users route - for admin purposes, so ensure proper authorization in the future
router.get('/all-users', verifyToken, getAllUsers)
export default router
