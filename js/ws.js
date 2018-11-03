var ws = new WebSocket("ws://127.0.0.1:9502");

ws.onopen = function(evt) {
    console.log("Connection open ...");
    ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
    var data = evt.data;
    console.log( "Received Message: " + data);

    ws.close();
};

ws.onclose = function(evt) {
    console.log("Connection closed.");
};
