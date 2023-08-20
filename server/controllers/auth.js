import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'

// SIGNUP
export const signup = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
      return res.status(409).send('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({ ...req.body, password: hashedPassword })
    await newUser.save()

    res.status(200).send('User created successfully')
  } catch (err) {
    next(err)
  }
}
// LOGIN
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, 'User not found'))

    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) return next(createError(401, 'Invalid password'))

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const { password, ...others } = user._doc

    res
      .cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }) // Added sameSite attribute for CSRF prevention.
      .status(200)
      .json(others)
  } catch (err) {
    next(err)
  }
}
// UPDATE USER

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    // Ensure the user is authenticated and either updating their own information or is an admin
    if (req.body.userId !== userId && req.userRole !== 'admin') {
      return res.status(403).send('You can only update your own information')
    }
    // Check if the password is part of the update, if yes, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    // Use the $set operator to update only fields that are present in the request body
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true } // This option returns the modified document rather than the original
    )

    // If user doesn't exist
    if (!updatedUser) {
      return res.status(404).send('User not found')
    }

    // Exclude password from the response for security
    const { password, ...others } = updatedUser._doc
    res.status(200).json(others)
  } catch (error) {
    next(error)
  }
}
