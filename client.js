const io = require('socket.io-client');

//const url = "http://localhost:8080";

const url = "https://seralar.herokuapp.com"

const socket = io(url,{});

const update = () => {
    var id = 0;
    var temp = 25;
    
    setInterval(() => {
        temp += 1-(2*Math.round(Math.random()));
        socket.emit('gh_info',id,temp);
      }, 3000);
}

update();