"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
const express = require('express');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');
// Import newUserRouter using dynamic import
Promise.resolve().then(() => __importStar(require('./routes/newUser.js'))).then((module) => {
    const newUserRouter = module.default;
    const expressServer = express();
    expressServer.use(express.json());
    expressServer.use(express.static(path.join(__dirname, 'public')));
    // Use the newUserRouter for the '/api/v1/users' route
    expressServer.use('/api/v1/users', newUserRouter);
    if (process.env.NODE_ENV === 'production') {
        const envConfig = require('dotenv').config();
        if (envConfig.error)
            throw envConfig.error;
        expressServer.use(express.static(path.join(__dirname, 'public')));
        // Serve the index.html file directly
        server.use('/assets', express.static(path.resolve(__dirname, '../assets')));
        server.use('/audio', express.static(path.resolve(__dirname, '../audio')));
        server.use('/data', express.static(path.resolve(__dirname, '../data')));
        server.use('/image', express.static(path.resolve(__dirname, '../image')));
        server.get('*', (req, res) => {
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
