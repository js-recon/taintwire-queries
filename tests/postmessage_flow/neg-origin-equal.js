window.addEventListener("message", (e) => {
    if (e.origin !== "https://example.com") return;
    document.body.innerHTML = e.data.html;
});
