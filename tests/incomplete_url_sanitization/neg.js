const next = new URLSearchParams(location.search).get("next");
if (new URL(next).hostname === "example.com") location.assign(next);
