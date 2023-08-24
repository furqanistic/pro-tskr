import Bid from '../models/Bid.js'

export const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate('bidder project')
    return res.status(200).json({ success: true, data: bids })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bids.',
      error: error.message,
    })
  }
}

export const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId).populate('bidder project')
    if (!bid) {
      return res.status(404).json({ success: false, message: 'Bid not found.' })
    }
    return res.status(200).json({ success: true, data: bid })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bid.',
      error: error.message,
    })
  }
}

export const createBid = async (req, res) => {
  try {
    // Check if the user has already placed a bid for this project
    const existingBid = await Bid.findOne({
      bidder: req.body.bidder,
      project: req.body.project,
    })

    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: 'You have already placed a bid on this project.',
      })
    }

    // If not, proceed to create the bid
    const bid = new Bid(req.body)
    await bid.save()
    return res
      .status(201)
      .json({ success: true, message: 'Bid created successfully!', data: bid })
  } catch (error) {
    // Handle duplicate key error, which might occur due to the unique constraint.
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already placed a bid on this project.',
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to create bid.',
      error: error.message,
    })
  }
}

export const updateBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.bidId, req.body, {
      new: true,
    })
    if (!bid) {
      return res.status(404).json({ success: false, message: 'Bid not found.' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'Bid updated successfully!', data: bid })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update bid.',
      error: error.message,
    })
  }
}

export const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.bidId)
    if (!bid) {
      return res.status(404).json({ success: false, message: 'Bid not found.' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'Bid deleted successfully!' })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete bid.',
      error: error.message,
    })
  }
}
