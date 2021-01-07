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

const gh_list = [];
const gh_temp = [];
//const offline = [];

io.on('connection', function (socket) {

    /*
    socket.on('disconnect', function() {
        offline.push(id);
     });
    */

    setInterval(() => {

        for(i in gh_list)
            socket.emit('gh_info',i,gh_list[i]);
        
        /*
        for(i in offline)
            socket.emit('gh_offline',offline[i]);
        */

    }, 1000);

    socket.on('gh_temp',(id,temp) => {
        console.log("New temp: " + id + "," + temp);
        gh_temp[id] = temp;
    });

    socket.on('gh_info',(id,temp) => {
        gh_list[id] = temp; // update greenhouse temp

        if(gh_temp[id]){
            socket.emit('gh_temp',gh_temp[id])
            delete gh_temp[id];
        }
    });
});

http.listen(port);