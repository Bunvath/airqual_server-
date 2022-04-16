var PORT = process.env.PORT || 3000;
var app = require('./app')
var http = require('http');
var server = http.Server(app);

server.listen(PORT, function () {
    console.log('listening on port:' + PORT);
}
);

var io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:4200', 'https://kohkjongcontrol.herokuapp.com', 'http://192.168.0.103:5000', 'http://172.20.10.1:20','http://localhost:50277','https://kohkjongadmin.web.app'],
        
        credentials: true
    },
    allowEIO3: true
});

module.exports = io 



