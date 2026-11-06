const page = location.hash.slice(1);
$.get("/api/pages/" + page);
