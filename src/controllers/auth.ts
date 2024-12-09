import { Request, Response } from 'express'

import dotenv from 'dotenv'
import { getGoogleClient } from '../config/google'

dotenv.config()

export const verifyToken = async (req: Request, res: Response) => {
  const { google_token } = req.body

  if (!google_token) {
    res.status(400).json({ error: 'Google token is required' })
  }

  const client = getGoogleClient()

  try {
    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (payload) {
      const { email, name, picture, sub } = payload
      res.status(200).json({
        success: true,
        message: 'Token is valid',
        user: {
          id: sub,
          name,
          email,
          picture,
        },
      })
    } else {
      res.status(401).json({ error: 'Failed to retrieve payload from token' })
    }
  } catch (error) {
    console.error('Error verifying token:', error)
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
