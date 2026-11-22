// The DOM's own Element.append/after insert a string as text.
var el = document.getElementById("out");
el.append(location.hash.slice(1));
el.after(decodeURIComponent(location.search));
