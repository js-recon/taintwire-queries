fetch("/api/track", { headers: { Referer: document.referrer } });
const xhr = new XMLHttpRequest();
xhr.setRequestHeader("Cookie", location.hash.slice(1));
