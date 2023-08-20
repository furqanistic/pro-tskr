import Portfolio from '../models/Portfolio.js'
import User from '../models/User.js'

// Retrieve all portfolios of a specific user
export const getUserPortfolios = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const portfolios = await Portfolio.find({ userId: currentUser._id })
    res.status(200).json(portfolios)
  } catch (error) {
    next(error)
  }
}

// Create a new portfolio entry
export const createPortfolio = async (req, res, next) => {
  try {
    const portfolio = new Portfolio({ ...req.body, userId: req.body.userId })
    await portfolio.save()
    res.status(201).json(portfolio)
  } catch (error) {
    next(error)
  }
}

// Retrieve a specific portfolio entry
export const getPortfolioById = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.portfolioId)
    const portfolio = await Portfolio.find({ userId: currentUser._id })
    if (!portfolio) {
      return res.status(404).send('Portfolio not found')
    }
    res.status(200).json(portfolio)
  } catch (error) {
    next(error)
  }
}

// Update a specific portfolio entry
export const updatePortfolio = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.portfolioId)
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.portfolioId,
      req.body,
      { new: true }
    )
    if (!updatedPortfolio) {
      return res.status(404).send('Portfolio not found')
    }
    res.status(200).json(updatedPortfolio)
  } catch (error) {
    next(error)
  }
}

// Delete a specific portfolio entry
export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.portfolioId)
    if (!portfolio) {
      return res.status(404).send('Portfolio not found')
    }
    res.status(200).send('Portfolio deleted successfully')
  } catch (error) {
    next(error)
  }
}
