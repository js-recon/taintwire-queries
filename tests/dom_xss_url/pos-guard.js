var h = location.hash.slice(1);
if (h && h.includes("<b>")) {
    document.getElementById("out").innerHTML = h;
}
