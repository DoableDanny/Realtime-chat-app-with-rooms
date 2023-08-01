require('dotenv/config');
const express = require('express');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Import newUserRouter using dynamic import
import('./routes/newUser.js')
  .then((module) => {
    const newUserRouter = module.default;

    const expressServer = express();

    expressServer.use(express.json());
    expressServer.use(express.static(path.join(__dirname, 'public')));

    // Use the newUserRouter for the '/api/v1/users' route
    expressServer.use('/api/v1/users', newUserRouter);

    expressServer.get('/api/v1/users/signature', (req, res) => {
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

    if (process.env.NODE_ENV === 'production') {
      expressServer.use(express.static(path.join(__dirname, 'public')));
      // Serve the index.html file directly
      expressServer.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/src/index.html'));
      });
    }

    const port = process.env.PORT || 3000;
    expressServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    module.exports = expressServer;
  })
  .catch((error) => {
    console.error('Error loading newUser.js:', error);
  });
