const next = new URLSearchParams(location.search).get("next");
if (next.includes("example.com")) location.assign(next);
