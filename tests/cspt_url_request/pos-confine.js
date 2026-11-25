// The value lands in the query: it can't change the request path
var e = new URLSearchParams(location.search).get("id");
fetch(`/api/x?id=${encodeURIComponent(e)}`);
var t = location.hash.slice(1);
fetch("/api/search?q=" + t);
