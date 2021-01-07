var dps = [];
var charts = [];
var gh_labels = [];
var tempIndex = [];

var maxData = 10;

const list = document.getElementById('gh-list');

const clicks = (id) => {
    
    temp = document.getElementById(id + "i").value;
    console.log(temp);
    
    socket.emit('gh_temp',id,temp);

}


const update = (id,temp) => {

    if(!gh_labels[id]){

        const big_div = document.createElement('div');
        list.appendChild(big_div);

        // creating new label for greenhouse
        gh_labels[id] = document.createElement('a');
        big_div.appendChild(gh_labels[id]);
        

        const form_div = document.createElement('div');
        form_div.className = "form-div";
        const input = document.createElement('input');
        input.id = id + "i";
        const button_span = document.createElement('span');
        button_span.innerHTML = "<button onclick=\"clicks("+ id + ")\">Değiştir</button>"
        
        form_div.appendChild(input);
        form_div.appendChild(button_span);

        big_div.appendChild(form_div);

        // creating new graph for greenhouse
        dps[id] = [];
        tempIndex[id] = 2;

        dps[id].push({x:1,y:temp});

        const graph_div = document.createElement('div');
        graph_div.id = id;
        graph_div.className = "graph";
        big_div.appendChild(graph_div);

        charts[id] = new CanvasJS.Chart(id, {
            title :{text: ""},
            data: [{type: "line",dataPoints: dps[id]}]
        });

    }
    else
    {
        dps[id].push({x:tempIndex[id],y:temp});
        tempIndex[id]++;

        if(dps[id].length > maxData)
            dps[id].shift();
    } 

    gh_labels[id].innerHTML = 'ID: ' + id+ ' <span>' + temp + " °C</span>";
    charts[id].render();
};



const socket = io();

socket.on('connect', () => {});

socket.on('gh_info',(gh_id,temp) => {
    update(gh_id,temp);
});

socket.on('gh_disconnect',(gh_id) => { // if disconnected, make it offline
    //
});