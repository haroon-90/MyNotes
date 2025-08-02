import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Save } from 'lucide-react'

const AddNotes = ({ editNote, getNotes }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title)
      setContent(editNote.content)
    }
  }, [editNote])

  const handleSubmit = async (e) => {
    console.log("Handlesubmit is called")
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      if (editNote) {
        await axios.put(`http://localhost:5000/api/notes/${editNote._id}`, {
          title,
          content
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } else {
        await axios.post('http://localhost:5000/api/notes/', {
          title,
          content
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }

      setTitle('')
      setContent('')
      getNotes()
    } catch (err) {
      console.log('Error saving note:', err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-tight">
        {editNote ? 'Edit Note' : 'Add New Note'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Title</label>
          <input
            type="text"
            placeholder="Enter note title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Content</label>
          <textarea
            rows={6}
            placeholder="Write your note here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex gap-2 cursor-pointer items-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-full transition duration-200"
          >
            <Save className='h-7 text-white' />{editNote ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNotes
