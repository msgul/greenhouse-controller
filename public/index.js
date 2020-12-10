var dps = [];
var charts = [];
var gh_labels = [];
var tempIndex = [];

var maxData = 10;

const list = document.getElementById('gh-list');

const update = (id,temp) => {

    if(!gh_labels[id]){

        const big_div = document.createElement('div');
        list.appendChild(big_div);

        // creating new label for greenhouse
        gh_labels[id] = document.createElement('a');
        gh_labels[id].innerHTML = 'ID: ' + id+ ' <span>' + temp + " °C</span>";
        big_div.appendChild(gh_labels[id]);
        
        // creating new graph for greenhouse
        dps[id] = [];
        tempIndex[id] = 2;

        dps[id].push({x:1,y:temp});

        const graph_div = document.createElement('div');
        graph_div.id = id;
        big_div.appendChild(graph_div);
        big_div.appendChild(document.createElement("br"));
        big_div.appendChild(document.createElement("br"));
        big_div.appendChild(document.createElement("br"));
        big_div.appendChild(document.createElement("br"));
        big_div.appendChild(document.createElement("br"));
        big_div.appendChild(document.createElement("br"));

        charts[id] = new CanvasJS.Chart(id, {
            title :{text: ""},
            data: [{type: "line",dataPoints: dps[id]}]
        });
        charts[id].render();

    }
    else
    {
        gh_labels[id].innerHTML = 'ID: ' + id+ ' <span>' + temp + " °C</span>";
        dps[id].push({x:tempIndex[id],y:temp});
        tempIndex[id]++;

        if(dps[id].length > maxData)
            dps[id].shift();

        charts[id].render();
    } 
};

const socket = io();

socket.on('connect', () => {});

socket.on('gh_info',(gh_id,temp) => {
    update(gh_id,temp);
});

socket.on('gh_disconnect',(gh_id) => { // if disconnected, make it offline
    //
});