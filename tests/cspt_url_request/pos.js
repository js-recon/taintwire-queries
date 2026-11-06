const q = new URLSearchParams(location.search).get("q");
fetch("/api/items/" + q);
