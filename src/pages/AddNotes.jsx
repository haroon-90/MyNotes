import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div className="p-4 bg-white shadow-md rounded-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">{editNote ? 'Edit Note' : 'Add Note'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 p-2 border rounded"
          placeholder="Content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editNote ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default AddNotes
