import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import notesRoutes from './routes/notesRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Hello world!")
})
app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  })
  .catch((err) => console.error('DB connection error:', err.message))
