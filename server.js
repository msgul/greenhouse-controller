var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 8080;

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const gh_list = {}

io.on('connection', function (socket) {

    setInterval(() => {

        for(i in gh_list)
            socket.emit('gh_info',i,gh_list[i]);

    }, 3000);

    socket.on('gh_info',(gh_id,temp) => {
        gh_list[gh_id] = temp; // update greenhouse temp
    });

});

http.listen(port);