window.addEventListener('message', function(e) {
    var d = JSON.parse(e.data);
    if (d.type === "nav") {
        document.body.innerHTML = "<a href='" + d.url + "'>go</a>";
    } else if (d.type === "html") {
        document.body.innerHTML = `<p>${d.html}</p>`;
    }
    switch (d.kind) {
        case "x": break;
        default: document.getElementById("o").innerHTML = d.body;
    }
});
