import dotenv from 'dotenv';
dotenv.config();

import { v2 } from 'cloudinary'
import express from 'express'
import { addUser, getUsers } from '../db/newUser.js'
import { getMsgs } from '../db/msgs.js'
const router = express.Router()


//server = /api/v1/newUser

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send('Bad request/server side Route')
      return
    }
    const { username, bio, image } = req.body.newUser
    const newUser = addUser({
      username,
      bio,
      image,
    })
    res.status(200).json({ newUser })
  } catch (err) {
    console.log(err)
    res.status(500).send('error adding user')
  }
})

router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const messages = await getMsgs
    console.log(`fetched msges by username (${username}):`, messages)
    res.json({ username })
  } catch (error) {
    console.error('error getting messages by username:', error)
    res.status(500).json({ error: 'Backend error getting messages' })
  }
})

router.get('/signature', (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  const timestamp = Math.round(new Date().getTime() / 1000)

  const signature = v2.utils.api_sign_request(
    {
      timestamp,
    },
    apiSecret
  )

  res.json({
    signature,
    timestamp,
    cloudName,
    apiKey,
  })
})

v2.uploader.upload(
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
  { public_id: 'olympic_flag' },
  function (error, result) {
    console.log(result)
  }
)
export default router
