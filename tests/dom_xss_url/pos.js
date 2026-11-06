const q = new URLSearchParams(location.search).get("q");
document.getElementById("out").innerHTML = q;
