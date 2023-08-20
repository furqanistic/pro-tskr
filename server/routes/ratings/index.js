import express from 'express'
import {
  getUserReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} from '../../controllers/review.js'
import { verifyToken } from '../../verifyToken.js'

const router = express.Router()

router.get('/:userId', getUserReviews)
router.post('/', verifyToken, createReview)
router.get('/entry/:reviewId', getReviewById)
router.put('/entry/:reviewId', verifyToken, updateReview)
router.delete('/entry/:reviewId', verifyToken, deleteReview)

export default router
