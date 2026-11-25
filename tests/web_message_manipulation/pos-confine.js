// The page's own origin, a computed origin and a literal one
window.parent.postMessage(location.href, location.protocol + "//" + location.host);
var u = document.URL;
frame.contentWindow.postMessage({ event: "prefill", url: u }, new URL(this.url, "https://scheduler.example").origin);
w.postMessage(location.hash, "https://widget.example");
