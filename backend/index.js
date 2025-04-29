// Import all the necessary modules, like below:-

const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
require("dotenv").config(); 


// Middleware to allow json data and cors requests;
app.use(express.json());
app.use(cors());

//create server using express;
const server = http.createServer(app);

//Serve a basic response for the root route
app.get('/', (request, response)=>{
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method)
    response.send  ('server is running')});
    
//Initialize socket.io server with cors settings;
const io = new Server(server, {
    cors: {
    origin: process.env.CORS_ORIGIN || 'https://water-trite-persimmon.glitch.me'},
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
server.listen(3000, '0.0.0.0',()=>{
    console.log('Server is running on port 3000');
});