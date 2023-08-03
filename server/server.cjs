/*require('dotenv/config');
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

    if (process.env.NODE_ENV === 'production') {
      const envConfig = require('dotenv').config()
    if (envConfig.error) throw envConfig.error

      expressServer.use(express.static(path.join(__dirname, 'public')));
      // Serve the index.html file directly
        server.use('/assets', express.static(path.resolve(__dirname, '../assets')))
        server.use('/audio', express.static(path.resolve(__dirname, '../audio')))
        server.use('/data', express.static(path.resolve(__dirname, '../data')))
        server.use('/image', express.static(path.resolve(__dirname, '../image')))
        server.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, '../client/src/index.html'));
      });
    }

    const port = process.env.PORT || 3001;
    expressServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    module.exports = expressServer;
  })
  .catch((error) => {
    console.error('Error loading newUser.js:', error);
  });
*/