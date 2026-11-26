// Bootstrap 4.5 sanitizeHtml (bootstrap.min.js, beautified): x.parentNode.removeChild(x) for a disallowed tag.
function Q(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (var i = new window.DOMParser().parseFromString(t, "text/html"), o = Object.keys(e), s = [].slice.call(i.body.querySelectorAll("*")),
        r = function (t, n) {
            var i = s[t], r = i.nodeName.toLowerCase();
            if (-1 === o.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";
            var a = [].slice.call(i.attributes), l = [].concat(e["*"] || [], e[r] || []);
            a.forEach(function (t) { -1 === l.indexOf(t.nodeName.toLowerCase()) && i.removeAttribute(t.nodeName); });
        }, a = 0, l = s.length; a < l; a++) r(a);
    return i.body.innerHTML;
}
Q(document.title, { a: ["href"], b: [] });
