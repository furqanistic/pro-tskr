import express from 'express'
import {
  getUserPortfolios,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from '../../controllers/portfolio.js'
import { verifyToken } from '../../verifyToken.js'

const router = express.Router()

router.post('/', verifyToken, createPortfolio)
router.get('/:userId', getUserPortfolios)
router.get('/entry/:portfolioId', getPortfolioById)
router.put('/entry/:portfolioId', verifyToken, updatePortfolio)
router.delete('/entry/:portfolioId', verifyToken, deletePortfolio)

export default router
