function onMessage(e) {
    document.body.innerHTML = e.data.html;
}
window.addEventListener("message", onMessage);
