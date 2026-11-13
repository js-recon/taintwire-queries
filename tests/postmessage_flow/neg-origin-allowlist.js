const allowed = new Set(["https://a.example.com", "https://b.example.com"]);
function onMessage(e) {
    if (!allowed.has(e.origin)) return;
    document.body.innerHTML = e.data.html;
}
window.addEventListener("message", onMessage);
