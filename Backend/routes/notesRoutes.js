import express from 'express'
import Auth from '../middlewares/AuthMiddleware.js'
import { AllNotes, AddNotes, EditNote, DeleteNote } from '../controllers/notesController.js'

const router = express.Router()

router.get('/', Auth, AllNotes)
router.post('/', Auth, AddNotes)
router.put('/:id', Auth, EditNote)
router.delete('/:id', Auth, DeleteNote)

export default router
