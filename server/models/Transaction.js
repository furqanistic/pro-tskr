import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: mongoose.Schema.Types.Decimal128, // Use Decimal128 type
      required: true,
    },
    type: {
      type: String,
      enum: ['Earned', 'Paid', 'Withdrawn'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Transaction', TransactionSchema)
