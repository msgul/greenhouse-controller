var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/client.html');
});

const gh_list = {}

io.on('connection', function (socket) {

    console.log(socket.id + " is connected.");

    setInterval(() => {

        for(i in gh_list){
            console.log("id: " +  i + " Sıcaklık: " + gh_list[i]);
            socket.emit('gh_info',i,gh_list[i]);
        }
    }, 3000);

    socket.on('gh_info',(gh_id,temp) => {
        gh_list[gh_id] = temp; // update greenhouse temp
        id = gh_id;
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " is disconnected.");
    });
});

http.listen(8080, () => {
    console.log('listening on 8080');
});

