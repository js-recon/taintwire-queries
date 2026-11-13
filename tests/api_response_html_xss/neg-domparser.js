async function icon() {
    const res = await fetch("/img/logo.svg");
    const svg = await res.text();
    const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
    return doc.documentElement.getAttribute("viewBox");
}
