import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import portfoliosRoute from './routes/portfolio/index.js'
import reviewsRoute from './routes/ratings/index.js'
import projectRoute from './routes/project.js'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})
dotenv.config()
app.use(cookieParser())
app.use(express.json())
// routes
app.use('/api/auth/', authRoute)
app.use('/api/portfolios/', portfoliosRoute)
app.use('/api/reviews/', reviewsRoute)
app.use('/api/upload/', projectRoute)
// MongoDB connection function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
}

// app.use(express.static(path.join(__dirname, '/client/dist')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/dist', 'index.html'))
// })

// listen on port
app.listen(process.env.PORT || 5000, () => {
  connect()
  console.log('Server running at 5000')
})
