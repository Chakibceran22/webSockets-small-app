import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg)
        io.emit('message', msg);
    })
})

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
})
