import {
  createNotebook,
  deleteNotebook,
  getNotebooks,
  updateNotebook,
} from '../controllers/notebooks'

import express from 'express'

const router = express.Router()

router.post('/', createNotebook) // Create a new notebook
router.get('/', getNotebooks) // Fetch all notebooks for a user
router.patch('/:id', updateNotebook) // Update a specific notebook
router.delete('/:id', deleteNotebook) // Delete a specific notebook

export default router
