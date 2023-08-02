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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const harper_save_message_js_1 = __importDefault(require("./services/harper-save-message.js"));
const harper_get_messages_js_1 = __importDefault(require("./services/harper-get-messages.js"));
const leave_room_js_1 = __importDefault(require("./utils/leave-room.js"));
const app = (0, express_1.default)(); // Invoke the express function to create the app
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)()); // Add cors middleware
// Socket.IO Server
const httpServer = http_1.default.createServer(app); // Create a new HTTP server for Socket.IO
const server = http_1.default.createServer(app); // Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room
        let __createdtime__ = Date.now(); // Current timestamp
        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });
        // Send welcome msg to user that just joined chat only
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
        });
        // Save the new user to the room
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
        // Get last 100 messages sent in the chat room
        (0, harper_get_messages_js_1.default)(room)
            .then((last100Messages) => {
            // console.log('latest messages', last100Messages);
            socket.emit('last_100_messages', last100Messages);
        })
            .catch((err) => console.log(err));
    });
    socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { message, username, room, __createdtime__ } = data;
        io.in(room).emit('receive_message', data); // Send to all users in room, including sender
        try {
            const response = yield (0, harper_save_message_js_1.default)(message, username, room, __createdtime__); // Save message in db
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }));
    socket.on('leave_room', (data) => {
        const { username, room } = data;
        socket.leave(room);
        const __createdtime__ = Date.now();
        // Remove user from memory
        allUsers = (0, leave_room_js_1.default)(socket.id, allUsers);
        socket.to(room).emit('chatroom_users', allUsers);
        socket.to(room).emit('receive_message', {
            username: CHAT_BOT,
            message: `${username} has left the chat`,
            __createdtime__,
        });
        console.log(`${username} has left the chat`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected from the chat');
        const user = allUsers.find((user) => user.id == socket.id);
        if (user === null || user === void 0 ? void 0 : user.username) {
            allUsers = (0, leave_room_js_1.default)(socket.id, allUsers);
            socket.to(chatRoom).emit('chatroom_users', allUsers);
            socket.to(chatRoom).emit('receive_message', {
                message: `${user.username} has disconnected from the chat.`,
            });
        }
    });
});
// Replace "server.listen()" with "httpServer.listen()"
httpServer.listen(4000, () => {
    console.log('Socket.IO Server is running on port 4000');
});
