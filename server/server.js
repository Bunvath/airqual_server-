var PORT = process.env.PORT || 3000;
var express = require('express');
var app = require('./app')
var http = require('http');
var server = http.Server(app);


function Dictionary() {
    this.dataStore = [];
    this.add = function (button, status) {
        this.dataStore.push({
            button: button,
            status: status
        })
    }
    this.removeAt = function (button) {
        for (i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i].button === button) {
                this.dataStore.splice(this.dataStore[i], 1)
                return this.dataStore
            }
        }
        return this.dataStore
    }
    this.updateAt = function (button, status) {
        for (i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i].button === button) {
                this.dataStore[i].status = status
                return this.dataStore
            }
        }
        return this.dataStore
    }
    this.findAt = function (button) {
        for (i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i].button === button) {
                return button
            }
        }
        return this.dataStore
    }
    this.checkButton = function (button) {
        i = this.findAt(button)
        if (i === button) {
            return true
        } else {
            return false
        }


    }
}
var dictionary = new Dictionary()
// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

server.listen(PORT, function () {
    console.log('listening on port:' + PORT);
}
);

var io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:4200', 'https://kohkjongcontrol.herokuapp.com', 'http://192.168.0.103:5000', 'http://172.20.10.1:20','http://localhost:50277','https://kohkjongadmin.web.app'],
        
        credentials: true
    },
    reconnect: true, transports : ['websocket'], path: '/socket.io',

    allowEIO3: true
});

io.on('connection', function (socket) {

    console.log(socket.id + ' connected');
    socket.emit("connection","you conned to socket server")
    socket.on('message', function (data) {
        socket.broadcast.emit('message', data);
    });
    socket.on('open_light', data => {
        socket.broadcast.emit('open_light', data)
        var message = JSON.parse(JSON.stringify(data))
        var button = message.button
        var status = message.status
        var exist = dictionary.checkButton(button)
        if (exist) {
            dictionary.updateAt(button, status)
        } else {
            dictionary.add(button, status)
        }
        console.log(dictionary.dataStore)
    });

    socket.on('init', data => {
        console.log("calling init event")
        io.emit('initialize', dictionary.dataStore)
    })
    socket.on('data', data => {
        console.log("socket", data)
    })
    socket.on('remote', data => {
        var control = JSON.parse(JSON.stringify(data))
        var type = control.type
        var temp = control.temp
        var speed = control.speed
        var exist = dictionary.checkButton(type)
        if (type === 'air_con') {
            if (exist) {
                dictionary.updateAt(type, temp)
            } else {
                dictionary.add(type, temp)
            }
        } else {
            if (exist) {
                dictionary.updateAt(type, speed)
            } else {
                dictionary.add(type, speed)
            }
        }
        console.log(dictionary.dataStore)
    })
    socket.on('sensor_data', data => {
        console.log(data)
        socket.broadcast.emit("sensor_data", data)
    })
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
    socket.on('remote', data => {
        socket.broadcast.emit("remote", data)
        // console.log(data)

    })

});


