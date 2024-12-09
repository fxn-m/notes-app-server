import { Request, Response } from 'express'
import { and, eq } from 'drizzle-orm'

import db from '@/db'
import { notes } from '@/db/schema'

export const getNotes = async (req: Request, res: Response) => {
  const { notebookId } = req.params
  const { userId } = req.body

  try {
    const results = await db
      .select()
      .from(notes)
      .where(and(eq(notes.notebookId, notebookId), eq(notes.userId, userId)))
    res.status(200).json({ notes: results })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' })
  }
}

export const createNote = async (req: Request, res: Response) => {
  const { notebookId } = req.params
  const { userId, xPercent, yPercent, content } = req.body

  if (!xPercent || !yPercent || !content)
    res.status(400).json({ error: 'All note fields are required' })

  try {
    const [newNote] = await db
      .insert(notes)
      .values({
        notebookId: notebookId,
        xPercent,
        yPercent,
        content,
        userId,
      })
      .returning()
    res.status(201).json({ note: newNote })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' })
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params
  const { userId } = req.body

  try {
    await db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)))
    res.status(200).json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' })
  }
}
