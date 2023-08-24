import express from 'express'
import {
  getAllBids,
  getBidById,
  createBid,
  updateBid,
  deleteBid,
} from '../controllers/bid.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// Routes related to bids
router.post('/bids', verifyToken, createBid) // this will initiate a bid
router.get('/bids', verifyToken, getAllBids)
router.get('/bids/:bidId', verifyToken, getBidById)
router.put('/bids/:bidId', verifyToken, updateBid)
router.delete('/bids/:bidId', verifyToken, deleteBid)

export default router
