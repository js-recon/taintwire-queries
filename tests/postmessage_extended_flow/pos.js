window.addEventListener("message", (e) => {
    fetch(e.data.url);
});
