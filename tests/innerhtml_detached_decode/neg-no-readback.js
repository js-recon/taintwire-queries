// innerHTML into an element that is inserted, with no text read back: an HTML sink, not this pattern.
const box = document.createElement("div");
box.innerHTML = render(data);
document.body.appendChild(box);
