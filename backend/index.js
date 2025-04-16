// Import all the necessary modules, like below:-

const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');


// Middleware to allow json data and cors requests;
app.use(express.json());
app.use(cors());

//create server using express;
const server = http.createServer(app);

//Initialize socket.io server with cors settings;
const io = new Server(server, {
    cors: {
    origin: 'http://192.168.29.198:3000'},
    methods: ['GET', 'POST'] 
});


//Handle client socket connection along with relevant logs;
io.on('connection', (socket)=>{
    console.log('User connected!', socket.id)

    socket.on('send-message', (data)=>{
        console.log('Message received:', data);
        io.emit('received-message', data);
        console.log('Message sent to client', data.id)
    })
    
    //handle client disconnection;
    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id);
    });
    

});

// Start the server on port 3000;
server.listen(3000, ()=>{
    console.log('Server is running');
});