window.addEventListener("message", function (e) {
    if (window.debug) {
        location.href = e.data;
    }
});
