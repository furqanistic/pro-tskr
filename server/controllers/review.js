import Review from '../models/Review.js'

// Retrieve all reviews for a specific user
export const getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
    res.status(200).json(reviews)
  } catch (error) {
    next(error)
  }
}

// Create a new review
export const createReview = async (req, res, next) => {
  try {
    // Ensure that reviewerId is set to the authenticated user's ID (preventing spoofing)
    const review = new Review({ ...req.body, reviewerId: req.userId })
    await review.save()
    res.status(201).json(review)
  } catch (error) {
    next(error)
  }
}

// Retrieve a specific review
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (!review) {
      return res.status(404).send('Review not found')
    }
    res.status(200).json(review)
  } catch (error) {
    next(error)
  }
}

// Update a specific review
export const updateReview = async (req, res, next) => {
  try {
    // Ensure that the review can only be edited by the reviewer
    const review = await Review.findOne({
      _id: req.params.reviewId,
      reviewerId: req.userId,
    })
    if (!review) {
      return res.status(404).send('Review not found or not authorized to edit')
    }

    // Update and save the review
    Object.assign(review, req.body)
    await review.save()
    res.status(200).json(review)
  } catch (error) {
    next(error)
  }
}

// Delete a specific review
export const deleteReview = async (req, res, next) => {
  try {
    // Ensure that the review can only be deleted by the reviewer
    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      reviewerId: req.userId,
    })
    if (!review) {
      return res
        .status(404)
        .send('Review not found or not authorized to delete')
    }
    res.status(200).send('Review deleted successfully')
  } catch (error) {
    next(error)
  }
}
