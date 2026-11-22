// A socket's 'message' event comes from the server, not another window.
socket.on("message", function (e) { document.getElementById("chat").innerHTML = e.data; });
