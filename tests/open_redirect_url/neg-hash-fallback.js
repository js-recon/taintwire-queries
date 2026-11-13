// vue-router 3 HashHistory fallback: everything after the constant "/#" is a fragment
function checkFallback(base) {
    const path = decodeURI(location.hash.slice(1));
    window.location.replace(cleanPath(base + "/#" + path));
}
function cleanPath(p) {
    return p.replace(/\/\//g, "/");
}
