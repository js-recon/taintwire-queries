function sanitize(node, allowed) {
    if (node instanceof HTMLFormElement || !(node.attributes instanceof NamedNodeMap)) return node.remove();
    for (var a = 0; a < node.attributes.length; a += 1) {
        var attr = node.attributes[a];
        if (!allowed[attr.name]) node.removeAttribute(attr.name);
    }
}
