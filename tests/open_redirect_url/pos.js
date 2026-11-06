const next = new URLSearchParams(location.search).get("next");
location.assign(next);
