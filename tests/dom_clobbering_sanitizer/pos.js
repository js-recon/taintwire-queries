// The HTMLJanitor shape: parse the markup into a sandbox, walk it, filter each node's attributes.
function clean(html, allowed) {
    var sandbox = document.createElement("div");
    sandbox.innerHTML = html;
    sanitizeTree(sandbox, allowed);
    return sandbox.innerHTML;
}
function sanitizeTree(root, allowed) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    var node;
    while ((node = walker.nextNode())) sanitize(node, allowed);
}
function sanitize(node, allowed) {
    for (var a = 0; a < node.attributes.length; a += 1) {
        var attr = node.attributes[a];
        if (!allowed[attr.name]) {
            node.removeAttribute(attr.name);
            a = a - 1;
        }
    }
}
