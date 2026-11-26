// The #406587 strip helper with no untrusted input reaching it: only a constant and a parameter.
function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
export function label(item) { return strip(item.name) + strip("<b>x</b>"); }
