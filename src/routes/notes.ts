import { createNote, deleteNote, getNotes } from '../controllers/notes'

import express from 'express'

const router = express.Router()

router.post('/:notebookId', createNote) // Create a note in a specific notebook
router.get('/:notebookId', getNotes) // Fetch notes for a notebook
router.delete('/:id', deleteNote) // Delete a specific note

export default router
