import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import { addUser, getUsers } from '../db/newUser.js';
import { getMsgs } from '../db/msgs.js';
import { Router } from 'express';

const newUserRouter = Router();

// Define your middleware logic here
newUserRouter.use((req, res, next) => {

  next(); 
});

// Define your routes directly on the newUserRouter


newUserRouter.post('/', async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send('Bad request/server side Route');
      return;
    }
    const { username, bio, image } = req.body.newUser;
    const newUser = addUser({
      username,
      bio,
      image,
    });
    res.status(200).json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(500).send('error adding user');
  }
});

newUserRouter.get('/:username', async (req, res) => {
  try {
    const { username } = req.params; // Make sure 'username' is properly extracted from the request parameters
    const messages = await getMsgs(username);
    console.log(`fetched messages by username (${username}):`, messages);
    res.json({ messages });
  } catch (error) {
    console.error('Error getting messages by username:', error);
    res.status(500).json({ error: 'Backend error getting messages' });
  }
});


newUserRouter.get('/signature', (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    apiSecret
  );

  res.json({
    signature,
    timestamp,
    cloudName,
    apiKey,
  });
});

export default newUserRouter;
