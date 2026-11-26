// HackerOne #753971 (htmr): decode entities through a detached element, fed from an HTTP response.
export function unescape(str) {
  const div = window.document.createElement("div");
  div.innerHTML = str;
  return div.innerText;
}
export async function title(url) {
  const res = await fetch(url);
  return unescape(await res.text());
}
