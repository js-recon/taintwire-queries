// history.pushState/replaceState: the browser throws on a URL of another origin
var q = new URLSearchParams(location.search).get("page");
history.pushState({}, "", q);
var id = window.videoId;
window.history.replaceState(null, "", `/video/${id}${location.hash}`);
