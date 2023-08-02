"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
const newUser_js_1 = require("../db/newUser.js");
const msgs_js_1 = require("../db/msgs.js");
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const newUserRouter = express_2.default.Router();
// Define your routes directly on the newUserRouter
newUserRouter.post('/addUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            res.status(400).send('Bad request/server side Route');
            return;
        }
        const { username, bio, image } = req.body.newUser;
        const newUser = (0, newUser_js_1.addUser)({
            username,
            bio,
            image,
        });
        res.status(200).json({ newUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('error adding user');
    }
}));
newUserRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return 'hi';
    }
    catch (error) {
        console.error('Error getting hi', error);
        res.status(500).json({ error: 'error getting hi' });
    }
}));
newUserRouter.get('/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params; // Make sure 'username' is properly extracted from the request parameters
        const messages = yield (0, msgs_js_1.getMsgs)(username);
        console.log(`fetched messages by username (${username}):`, messages);
        res.json({ messages });
    }
    catch (error) {
        console.error('Error getting messages by username:', error);
        res.status(500).json({ error: 'Backend error getting messages' });
    }
}));
newUserRouter.get('/signature', (req, res) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary_1.v2.utils.api_sign_request({
        timestamp,
    }, apiSecret);
    res.json({
        signature,
        timestamp,
        cloudName,
        apiKey,
    });
});
exports.default = newUserRouter;
