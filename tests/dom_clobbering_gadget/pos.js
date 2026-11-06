const cfg = window.APP_CDN || "/static";
const s = document.createElement("script");
s.src = cfg;
document.head.appendChild(s);
