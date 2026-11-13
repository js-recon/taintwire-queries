const worker = new Worker("/render.js");
worker.onmessage = (e) => {
    document.getElementById("out").innerHTML = e.data.html;
};
