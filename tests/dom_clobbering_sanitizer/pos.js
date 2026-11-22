function sanitize(node, allowed) {
    for (var a = 0; a < node.attributes.length; a += 1) {
        var attr = node.attributes[a];
        if (!allowed[attr.name]) {
            node.removeAttribute(attr.name);
            a = a - 1;
        }
    }
}
