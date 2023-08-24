import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    // Common fields
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
      // unique: true,
      // trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      enum: ['freelancer', 'client'],
    },
    profilePicture: String,
    registrationDate: {
      type: Date,
      default: Date.now,
    },

    // Freelancer specific fields
    skills: [String],
    bio: String,
    hourlyRate: Number,
    totalHoursWorked: Number,
    jobSuccessScore: Number, // e.g., 0-100
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid',
      },
    ],

    // Fields for references to other collections
    portfolios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    // Client specific fields
    company: String,
    paymentMethods: [
      {
        type: {
          type: String,
          enum: ['creditCard', 'bankTransfer', 'paypal'],
        },
        details: String, // masked details or last 4 digits for security
      },
    ],
    postedJobs: [
      {
        jobId: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
)
export default mongoose.model('User', UserSchema)
