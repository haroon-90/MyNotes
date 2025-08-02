import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNotes from './AddNotes';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null)

    const getNotes = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/notes/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(res.data.reverse());
            console.log("All Notes", res.data);
        } catch (err) {
            console.log("Error", err);
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    const handleEdit = (note) => {
        setEditNote(note)
    }

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.delete(`http://localhost:5000/api/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Deleted", res.data)
            setNotes(prev => prev.filter(note => note._id !== id))
        } catch (err) {
            console.log("Delete Error", err)
        }
    }


    return (
        <div className="bg-gray-100 p-6 rounded-xl">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">All Notes</h1>

            <AddNotes editNote={editNote} getNotes={getNotes}/>

            {notes === undefined || notes.length === 0 ? (
                <p className="text-center text-gray-500">No notes found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                    {notes.map((note) => (
                        <div key={note._id} className="bg-white flex flex-col justify-between rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300">
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">{note.title}</h2>
                            <p className="text-gray-700">{note.content}</p>
                            <div className='flex justify-between'>
                                <p className="text-sm text-gray-400 mt-3">Created on: {new Date(note.createdAt).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-400 mt-3">Updated on: {new Date(note.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <button className='px-4 rounded bg-green-500' onClick={() => handleEdit(note)}>Edit</button>
                                <button className='px-4 rounded bg-red-500' onClick={() => handleDelete(note._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllNotes;
