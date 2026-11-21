let newWebSocket = new WebSocket(location.origin.replace("http", "ws") + "/academyLabHeader");
newWebSocket.onmessage = function (evt) {
    if (evt.data === "PONG") return;
    document.getElementById("academyLabHeader").innerHTML = evt.data;
};
