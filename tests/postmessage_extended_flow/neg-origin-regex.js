window.addEventListener("message", (e) => {
    if (!/^https:\/\/([a-z]+\.)?example\.com$/.test(e.origin)) return;
    fetch(e.data.url);
});
