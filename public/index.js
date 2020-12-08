io.on('connection', socket => {
    let counter = 0;
    setInterval(() => {
      socket.emit('hello', ++counter);
    }, 1000);
  });