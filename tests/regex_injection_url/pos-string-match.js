const q = new URLSearchParams(location.search).get("q");
document.title.match(q);
