import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../controllers/notes'

import express from 'express'

const router = express.Router()

router.post('/:notebookId', createNote) // Create a note in a specific notebook
router.get('/:notebookId', getNotes) // Fetch notes for a notebook
router.patch('/:id', updateNote) // Update a specific note
router.delete('/:id', deleteNote) // Delete a specific note

export default router
