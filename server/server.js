require('dotenv').config()
import { join } from 'node:path'
import express from 'express'
import path from 'path'
import newUser from './routes/newUser.js'

expressServer.use(express.json())
expressServer.use(express.static(join(__dirname, 'public')))

expressServer.use('/api/v1/users', newUser)

if (process.env.NODE_ENV === 'production') {
  expressServer.use(
    '/assets',
    express.static(path.resolve(__dirname, '../assets'))
  )
  expressServer.use(
    '/audio',
    express.static(path.resolve(__dirname, '../audio'))
  )
  expressServer.use('/data', express.static(path.resolve(__dirname, '../data')))
  expressServer.use(
    '/image',
    express.static(path.resolve(__dirname, '../image'))
  )
  expressServer.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
  })
}

export default expressServer
