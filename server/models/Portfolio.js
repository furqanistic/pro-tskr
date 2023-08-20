import mongoose from 'mongoose'

const PortfolioSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },

  client: {
    // Linking the project to the user who posted it
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  link: String,
  image: String,
  addedDate: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Portfolio', PortfolioSchema)
