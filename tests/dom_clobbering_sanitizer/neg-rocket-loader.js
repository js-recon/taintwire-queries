// Cloudflare Rocket Loader: re-inserts the page's own <script> tags; nothing is parsed from markup.
function g(t) {
    var e = "data-cf" + t.nonce;
    Array.prototype.forEach.call(document.querySelectorAll("[" + e + "]"), function (n) {
        n.removeAttribute(e);
        Array.prototype.forEach.call(n.attributes, function (a) { /^on/.test(a.name) && n.setAttribute(a.name, a.value.substring(t.len)); });
    });
}
