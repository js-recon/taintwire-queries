// indexOf on the origin is bypassable (example.com.attacker.test), so it still reports
window.addEventListener("message", (e) => {
    if (e.origin.indexOf("example.com") === -1) return;
    document.body.innerHTML = e.data.html;
});
