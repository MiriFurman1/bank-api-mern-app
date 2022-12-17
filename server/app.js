import express from 'express'
import cors from 'cors'
import { indexRouter } from './routes/index.router.js'

const app=express()
app.use(express.json())
app.use(cors())

app.use('/api',indexRouter)

export {app}