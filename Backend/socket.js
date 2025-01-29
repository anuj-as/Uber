import { Server } from "socket.io";
import { userModel } from "./models/user.model.js";
import { captainModel } from "./models/captain.model.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      try {
        const { userId, userType } = data;
        console.log(`user ${userId} joined as ${userType}`)
        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id })
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
        }
      } catch (error) {
        console.error(`Error in "join" event for socket ${socket.id}:`, error.message);
      }
    })

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      // console.log(`User ${userId} updated location to ${location}`);
      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' })
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        }
      })

    })

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`)
    })
  })
}

export const sendMessageToSocketId = (socketId, messageObj) => {
  console.log(`Sending message to ${socketId}`, messageObj);
  if (io) {
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.log(`Socket.io not initialized.`);
  }
}