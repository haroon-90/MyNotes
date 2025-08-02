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
        <div className="bg-gray-50 min-h-screen p-6 sm:p-10 rounded-2xl shadow-inner">
            <h1 className="text-4xl font-bold text-center text-blue-800 mb-10 tracking-tight">
                Notes List
            </h1>

            {/* Add/Edit Form */}
            <AddNotes editNote={editNote} getNotes={getNotes} />

            {notes === undefined || notes.length === 0 ? (
                <p className="text-center text-gray-500 mt-12 text-lg">
                    No notes yet. Start adding your ideas.
                </p>
            ) : (
                <div className="space-y-6 mt-8">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex-1 md:mr-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-1">{note.title}</h2>
                                <p className="text-gray-700 text-sm mb-2">{note.content}</p>
                                <div className="text-xs text-gray-400 space-x-3">
                                    <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                                    <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex-shrink-0 mt-4 md:mt-0 flex gap-3">
                                <button
                                    onClick={() => handleEdit(note)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(note._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllNotes;
