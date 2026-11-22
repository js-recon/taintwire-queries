window.addEventListener('message', function(e) {
    var d = e.data;
    if (typeof d === 'string' && d.length > 3) {
        if (d.startsWith('https://')) { } else { document.body.innerHTML = d; }
    }
    d !== 'x' && eval(d);
    window.location = d.match(/^\/[a-z]/) ? d : '/';
});
