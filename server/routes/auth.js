import express from 'express'
import { signup, signin, updateUser } from '../controllers/auth.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// Signup route
router.post('/signup', signup)

// Signin route
router.post('/signin', signin)
router.put('/update/:id', verifyToken, updateUser)
export default router
