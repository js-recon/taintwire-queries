async function show() {
    const res = await fetch("/api/comment");
    const body = await res.text();
    document.getElementById("out").innerHTML = body;
}
