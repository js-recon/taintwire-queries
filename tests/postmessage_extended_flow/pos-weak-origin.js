window.addEventListener("message", (e) => {
    if (!e.origin.endsWith("example.com")) return;
    fetch(e.data.url);
});
