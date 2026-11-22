// Safe decoders: <textarea>, <template>, an inert document, and a literal innerHTML.
function decode1(s) { const t = document.createElement("textarea"); t.innerHTML = s; return t.value + t.textContent; }
function decode2(s) { const t = document.createElement("template"); t.innerHTML = s; return t.content.textContent; }
function decode3(s) { const doc = document.implementation.createHTMLDocument(""); const d = doc.createElement("div"); d.innerHTML = s; return d.textContent; }
function clear() { const d = document.createElement("div"); d.innerHTML = ""; return d.textContent; }
