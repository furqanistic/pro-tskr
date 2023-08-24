import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
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
    option: {
      type: String,
      // required: true,
      enum: ['Choose Scope', 'Easy', 'Medium', 'Hard'],
    },
    category: {
      type: String,
      // required: true,
      enum: [
        'Choose Category',
        'Web & App design',
        'Content Writing',
        'Digital Marketing',
        'Software Development',
        'Graphics & Design',
        'IT & Networking',
        'Data Science & Analytics',
        'Engineering & Architecture',
        'Admin Support',
        'Customer Service',
        'Sales & Marketing',
        'Accounting & Consulting',
        'Translation',
        'Video & Animation',
        'Legal',
      ],
    },
    projectName: {
      type: String,
      required: true,
    },
    proposals: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deliverables: {
      type: String,
    },
    type: {
      type: String,
      enum: ['Fixed', 'Hourly'],
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
    awardedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    files: [
      {
        filename: String, // The name of the file as stored in storage service
        originalName: String, // The original name of the file as uploaded by the user
        mimeType: String, // The type of the file (e.g. "application/pdf", "image/jpeg")
        path: String, // URL/path to access the file in the storage service
      },
    ],
  },
  { timestamps: true }
)

ProjectSchema.statics.getCategories = function () {
  return this.schema.path('category').enumValues
}
ProjectSchema.statics.getOptions = function () {
  return this.schema.path('option').enumValues
}

export default mongoose.model('Project', ProjectSchema)
