import authRoutes from '@/routes/auth'
import cors from 'cors'
import express from 'express'
import noteRoutes from '@/routes/notes'
import notebookRoutes from '@/routes/notebooks'

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://fxn-m.com',
      'https://x9z4tvwl-5173.uks1.devtunnels.ms',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/notes', noteRoutes)
app.use('/notebooks', notebookRoutes)

export default app
