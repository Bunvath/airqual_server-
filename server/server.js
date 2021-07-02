var PORT = process.env.PORT || 5000;
var express = require('express');
var app = require('./app')
var http = require('http');
var server = http.Server(app);

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

server.listen(PORT, function () {
    console.log('listening on *:' + PORT);
}
);

var io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:', 'https://kohkjongcontrol.herokuapp.com','http://192.168.0.103:5000'],
        credentials: true
    },
    allowEIO3: true
});

io.on('connection', function (socket) {

    console.log(socket.id + ' connected');
    socket.on('message', function (data) {
        console.log(data);
        socket.broadcast.emit('message', data);
    });
    socket.on('open_light', data => {
        console.log(data);
        io.emit('open_light', data)
    });
    socket.on('server', data => {
        console.log(data);
    })
    socket.on('disconnect', data => {
        console.log(socket.id + " disconnect")
    })
    socket.on('manual_light', data => {
        socket.broadcast.emit("open_light", data)
        console.log(data)
    })
});


