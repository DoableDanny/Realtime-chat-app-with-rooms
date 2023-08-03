import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { addUser, getUsers } from '../db/newUser.js';
import { getMsgs } from '../db/msgs.js';
import { Router } from 'express';
import express from 'express';
import multer from 'multer';

const newUserRouter = express.Router();

// Removed the duplicate import of 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

newUserRouter.post('/api/v1/users/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' });
  }

  const image = req.file.buffer;
  const query = 'INSERT INTO images (image_data) VALUES (?)';
  const values = [image];

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('db img add error', err);
      return res.status(500).json({ message: 'failure adding img to db' });
    }
    console.log('img added to db');
    res.status(200).json({ message: 'Image added to db' });
  });
}); // <-- This was missing

// Rest of your route handlers

export default newUserRouter;
