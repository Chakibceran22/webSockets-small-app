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
    console.log('a user connected:', socket.id);
    socket.on('sendMessage',({message, sender}) => {
        console.log("message recived", message, sender);
        io.emit('receiveMessage', {message, sender});
    } )
    socket.on('disocnnect', () => {
        console.log('a user disconnected:' , socket.id);
    })
})

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
})
