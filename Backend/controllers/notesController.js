import Notes from "../models/Notes.js";

const AllNotes = async (req, res) => {
    console.log("AllNotes")
    // res.send("Done")
    try {
        const notes = await Notes.find({ userId: req.user })
        if(!notes){
            return res.status(201).json({msg: "No Saved notes found"})
        }
        res.status(200).json(notes)
    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

const AddNotes = async (req, res) => {
    console.log("AddNotes")
    const {title, content} = req.body;
    try {
        const newNote = new Notes ({
            userId : req.user,
            title,
            content
        })
        newNote.save();
        res.status(200).json({msg: "Note saved successfully"})

    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

const EditNote = async (req, res) => {
    console.log("EditNote")
    const user = req.user;
    const noteId = req.params.id;
    try {
        const {title, content} = req.body;

        const updated = await Notes.findByIdAndUpdate(
            {_id : noteId, userId: user},
            {title, content}
        )
        if(!updated){
            return res.status(201).json({msg: "Note not found"})
        }

        res.status(200).json({msg : "Note Updated successfully"})

    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

const DeleteNote = async (req, res) => {
    console.log("DeleteNote")
    try {
        const noteId = req.params.id;
        const user = req.user;

        const note = await Notes.find({_id : noteId, userId : user})
        if(!note){
            return res.status(201).json({msg : "Note Not found"})
        }

        await Notes.findByIdAndDelete(noteId);
        res.status(200).json({msg: "Note deleted successfully"})
    } catch (err) {
        res.status(500).json({ msg: "Server Error" })
    }
}

export {
    AllNotes,
    AddNotes,
    EditNote,
    DeleteNote
}