const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');


app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
    origin: 'http://192.168.29.198:3000'},
    methods: ['GET', 'POST']
});


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

server.listen(3000, ()=>{
    console.log('Server is running');
});

// app.get('/api', (req, res)=>{
//     res.send('hello')
// });


// http.listen(PORT, ()=>{

//     console.log(`Server is listening on ${PORT}`);
// })