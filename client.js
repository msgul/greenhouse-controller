const io = require('socket.io-client');

//const url = "http://localhost:8080";

const url = "https://seralar.herokuapp.com"

const socket = io(url,{});

const update = () => {
    var id = 5;
    var temp = 100;

    setInterval(() => {
        socket.emit('gh_info',id,temp++);
      }, 3000);
}

update();