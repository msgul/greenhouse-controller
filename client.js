const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM1', { baudRate: 9600 })


const io = require('socket.io-client');
const sp = require('serialport');
const url = "https://seralar.herokuapp.com/"



const socket = io(url,{});
socket.on('gh_temp',(temp) => {
    var vals = new Uint8Array([5,6,0,0,0,temp,73,132]);
    console.log("Temp: ",temp);
    port.write(vals);
});

const update = () => {
    var id = 1;
    var temp = 25;

 
  setInterval(() => {
    var degerler1 = new Uint8Array([5,3,0,0,0,1,133,142]);
    port.write(degerler1);

      }, 500);

  setInterval(() => {    
    var degerler1 = port.read();
	if(degerler1&&degerler1[1]==3)
    socket.emit('gh_info',id,degerler1[4]);

      }, 1000);

}

update();