// Svelte hydration claim_element (www.baros.com.ru index.25b3ba83.js): server-rendered nodes, no parsed markup.
function children(element) { return Array.from(element.childNodes); }
function claim_node(nodes, predicate, processNode, createNode) {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (predicate(node)) { processNode(node); nodes.splice(i, 1); return node; }
    }
    return createNode();
}
function claim_element(nodes, name, attributes, create) {
    return claim_node(nodes, (r) => r.nodeName === name, (r) => {
        const s = [];
        for (let c = 0; c < r.attributes.length; c++) {
            const o = r.attributes[c];
            attributes[o.name] || s.push(o.name);
        }
        s.forEach((c) => r.removeAttribute(c));
    }, () => create(name));
}
class HtmlTag { m(html, target) { this.e = document.createElement("div"); this.e.innerHTML = html; target.append(...this.e.childNodes); } }
claim_element(children(document.body), "DIV", { class: true }, (n) => document.createElement(n));
