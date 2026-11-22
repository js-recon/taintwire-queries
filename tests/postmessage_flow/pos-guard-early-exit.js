window.addEventListener('message', function(e) {
    var url = e.data;
    if (url.indexOf('http') === -1) return;
    if (!/^https?:/i.test(url)) { return; }
    if (debug) console.log(1);
    location.href = url;
});
