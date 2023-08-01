import('dotenv').config()
import express from 'express'
const app = express
import http from 'http'
import cors from 'cors'
import expressServer from './server.js'
import { Server } from 'socket.io'
import harperSaveMessage from './services/harper-save-message.js'
import harperGetMessages from './services/harper-get-messages.js'
import leaveRoom from './utils/leave-room.js' // Add this

app.use(cors()) // Add cors middleware

const port = process.env.PORT || 3000
expressServer.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

const server = http.createServer(app) // Add this

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const CHAT_BOT = 'ChatBot'
let chatRoom = '' // E.g. javascript, node,...
let allUsers = [] // All users in current chat room

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)

  // Add a user to a room
  socket.on('join_room', (data) => {
    const { username, room } = data // Data sent from client when join_room event emitted
    socket.join(room) // Join the user to a socket room

    let __createdtime__ = Date.now() // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    })
    // Send welcome msg to user that just joined chat only
    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    })
    // Save the new user to the room
    chatRoom = room
    allUsers.push({ id: socket.id, username, room })
    chatRoomUsers = allUsers.filter((user) => user.room === room)
    socket.to(room).emit('chatroom_users', chatRoomUsers)
    socket.emit('chatroom_users', chatRoomUsers)

    // Get last 100 messages sent in the chat room
    harperGetMessages(room)
      .then((last100Messages) => {
        // console.log('latest messages', last100Messages);
        socket.emit('last_100_messages', last100Messages)
      })
      .catch((err) => console.log(err))
  })

  socket.on('send_message', async (data) => {
    const { message, username, room, __createdtime__ } = data
    io.in(room).emit('receive_message', data) // Send to all users in room, including sender
    try {
      const response = await harperSaveMessage(
        message,
        username,
        room,
        __createdtime__
      ) // Save message in db
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  })

  socket.on('leave_room', (data) => {
    const { username, room } = data
    socket.leave(room)
    const __createdtime__ = Date.now()
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers)
    socket.to(room).emit('chatroom_users', allUsers)
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    })
    console.log(`${username} has left the chat`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat')
    const user = allUsers.find((user) => user.id == socket.id)
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers)
      socket.to(chatRoom).emit('chatroom_users', allUsers)
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      })
    }
  })
})

server.listen(4000, () => 'Server is running on port 4000')
