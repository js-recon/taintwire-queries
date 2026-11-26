// Bootstrap 5 sanitizeHtml (bootstrap.bundle.js): an element whose tag is not in the allowlist is removed before its
// attributes are read, and the default allowlist has no <form>.
const DefaultAllowlist = { "*": ["class", "dir", "id", "lang", "role"], a: ["target", "href", "title", "rel"], b: [], br: [], div: [], img: ["src", "alt"], p: [], span: [] };
function allowedAttribute(attribute, allowedAttributeList) { return allowedAttributeList.includes(attribute.nodeName.toLowerCase()); }
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) return unsafeHtml;
    if (sanitizeFunction && typeof sanitizeFunction === "function") return sanitizeFunction(unsafeHtml);
    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
    const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
    for (const element of elements) {
        const elementName = element.nodeName.toLowerCase();
        if (!Object.keys(allowList).includes(elementName)) { element.remove(); continue; }
        const attributeList = [].concat(...element.attributes);
        const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
        for (const attribute of attributeList) if (!allowedAttribute(attribute, allowedAttributes)) element.removeAttribute(attribute.nodeName);
    }
    return createdDocument.body.innerHTML;
}
sanitizeHtml(window.title, DefaultAllowlist);
