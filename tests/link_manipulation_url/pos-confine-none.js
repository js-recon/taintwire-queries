var u = location.hash.slice(1);
script.src = u;
frame.src = location.origin + u;
img.src = "//" + u + "/x.png";
$(frame).attr("srcdoc", "/x/" + u); // HTML, not a URL
