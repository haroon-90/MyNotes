import mongoose from 'mongoose'

const notes = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

const Notes = mongoose.model('Notes', notes)

export default Notes
