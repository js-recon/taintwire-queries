// HackerOne #406587: strip tags through a detached <div>.
function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
