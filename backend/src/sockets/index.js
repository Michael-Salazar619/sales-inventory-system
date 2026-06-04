import { Server } from 'socket.io';
import { env } from '../config/env.js';

const connectedUsers = new Map();

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.clientUrl, credentials: true }
  });

  io.on('connection', (socket) => {
    socket.on('user:online', (user) => {
      connectedUsers.set(socket.id, user);
      io.emit('users:online', [...connectedUsers.values()]);
    });

    socket.on('chat:message', (message) => {
      io.emit('chat:message', { ...message, sentAt: new Date().toISOString() });
    });

    socket.on('disconnect', () => {
      connectedUsers.delete(socket.id);
      io.emit('users:online', [...connectedUsers.values()]);
    });
  });

  return io;
}
