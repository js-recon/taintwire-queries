const q = new URLSearchParams(location.search).get("q");
location.assign("/search?q=" + q);
location.href = `#tab-${location.hash.slice(1)}`;
window.open("https://example.com/share?u=" + q);
