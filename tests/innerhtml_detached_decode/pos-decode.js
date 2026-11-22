// HackerOne #753971 (htmr): decode entities through a detached element.
export function unescape(str) {
  const div = window.document.createElement("div");
  div.innerHTML = str;
  return div.innerText;
}
