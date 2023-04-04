const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

// initialize the express app instance
const app = express();
const server = http.createServer(app);

// initialize the socket.io server
const io = new Server(server)

// dir to html static
const chatapp = 'c:/Users/HP/Desktop/chat app'

// render home
app.get('/', (req, res) => {
    res.sendFile(chatapp + '/index.html')
});


io.on('connection', (socket) => {
    // console.log('a user connected');
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
    socket.on('chat message', (msg) => {
        console.log('rasr: ' + msg)
        reply()
    })

    function reply() {
        socket.emit('reply', {
            msg: 'is typing....',
            isCommand: true,
        })
    
        setTimeout(() => {
            socket.emit('reply', {
                msg: 'this is an automated reply'
            })
        }, 10000)
    }
    // socket.on('chat message', (msg) => {
    //     io.emit('chat message', msg)
    // })
  });

server.listen(3000, () => {
    console.log('listening on *:3000')
})