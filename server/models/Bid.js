import mongoose from 'mongoose'

const BidSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },

    bidStatus: {
      type: String,
      enum: ['accepted', 'declined', 'pending'],
      default: 'pending',
    },

    proposedDuration: {
      type: String,
    },

    attachments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
)

BidSchema.index({ bidder: 1, project: 1 }, { unique: true })

export default mongoose.model('Bid', BidSchema)
