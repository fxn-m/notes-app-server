import { Request, Response } from 'express'
import { and, eq } from 'drizzle-orm'

import db from '@/db'
import { notebooks } from '@/db/schema'

export const createNotebook = async (req: Request, res: Response) => {
  const { id, userId, name } = req.body

  if (!id || !name) {
    res.status(400).json({ error: 'Notebook ID and name are required' })
    return
  }

  try {
    const [newNotebook] = await db
      .insert(notebooks)
      .values({ id, userId, name })
      .returning()

    res.status(201).json({ notebook: newNotebook })
  } catch (error) {
    console.error('Failed to create notebook:', error)
    res.status(500).json({ error: 'Failed to create notebook' })
  }
}

export const getNotebooks = async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  try {
    const results = await db
      .select()
      .from(notebooks)
      .where(eq(notebooks.userId, userId))
    res.status(200).json({ notebooks: results })
  } catch (error) {
    console.error('Failed to fetch notebooks:', error)
    res.status(500).json({ error: 'Failed to fetch notebooks' })
  }
}

export const updateNotebook = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  if (!name) res.status(400).json({ error: 'Notebook name is required' })

  try {
    const [updatedNotebook] = await db
      .update(notebooks)
      .set({ name })
      .where(eq(notebooks.id, id))
      .returning()
    res.status(200).json({ notebook: updatedNotebook })
  } catch (error) {
    console.error('Failed to update notebook:', error)
    res.status(500).json({ error: 'Failed to update notebook' })
  }
}

export const deleteNotebook = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.body

  try {
    await db
      .delete(notebooks)
      .where(and(eq(notebooks.id, id), eq(notebooks.userId, userId)))
    res.status(200).json({ message: 'Notebook deleted successfully' })
  } catch (error) {
    console.error('Failed to delete notebook:', error)
    res.status(500).json({ error: 'Failed to delete notebook' })
  }
}
