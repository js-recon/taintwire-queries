// DOMParser + querySelectorAll, with the tag allowlist allowing <form> (so a clobbering form is kept).
const ALLOWED = { form: ["id"], input: ["id", "name"], b: [] };
export function sanitizeHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    for (const el of doc.body.querySelectorAll("*")) {
        const tag = el.nodeName.toLowerCase();
        if (!(tag in ALLOWED)) { el.remove(); continue; }
        for (const attr of [...el.attributes]) if (!ALLOWED[tag].includes(attr.name)) el.removeAttribute(attr.name);
    }
    return doc.body.innerHTML;
}
