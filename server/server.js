var PORT = process.env.PORT || 3000;
var app = require('./app')
var http = require('http');
var server = http.Server(app);

server.listen(PORT, function () {
    console.log('listening on port:' + PORT);
}
);



module.exports = server



