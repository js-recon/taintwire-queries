// Not Element.attributes: a parser object's attributes.tokens (35mile f3d7205d48252416.js).
function render(markup) {
    const holder = document.createElement("div");
    holder.innerHTML = markup;
    const r = new Parser(holder.firstChild);
    for (let [t, e] of r.attributes.tokens) if (e) r.removeAttribute(t);
}
