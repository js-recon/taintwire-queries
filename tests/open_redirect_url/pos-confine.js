// Same-origin positions. A generic attribute setter, with the template one call before it.
function set(el, k, r) { null == r ? el.removeAttribute(k) : el.setAttribute(k, r); }
var id = window.newsId;
set(a, "href", `/article/${id}${location.search}`);
function go(u) { location.href = u; }
var q = new URLSearchParams(location.search).get("next");
go("/login?redirect=".concat(q));
var h = location.hash.slice(1);
window.location.assign(location.pathname + "#" + h);
location.replace("https://" + location.host + location.pathname + location.search);
location.href = "/" + parseInt(new URLSearchParams(location.search).get("p"));
location.href = "/" + encodeURIComponent(document.referrer);
function nav(u) { location.assign(u); }
nav("/app/" + document.URL);
