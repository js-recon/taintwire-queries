window.parent.postMessage(location.href, "*");
window.addEventListener("message", function (e) { e.source.postMessage(document.URL, e.origin); });
w.postMessage("hi", location.hash.slice(1));
