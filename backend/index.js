const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');


// Middleware to allow json data and cors requests;
app.use(express.json());
app.use(cors());

//create HTTP server;
const server = http.createServer(app);


//Initialize socket.io server with cors settings;
const io = new Server(server, {
    cors: {
    origin: 'http://10.0.2.2:3000'}, // Enter your emulators's IP address, if testing on the emulators;
                                     // Enter your machine's IP address, if testing on the physical devices;
});


//Handle client socket connection;
io.on('connection', (socket)=>{
    console.log('User connected!', socket.id)

    socket.on('send-message', (data)=>{
        console.log('Message received:', data);
        io.emit('received-message', data);
        console.log('Message sent to client', data.id)
    })
    
    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    });
    

});

// Start the server;
server.listen(3000,()=>{
    console.log('Server is running');
});