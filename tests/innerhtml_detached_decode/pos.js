// HackerOne #406587: strip tags through a detached <div>, here fed from the URL.
function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
document.title = strip(decodeURIComponent(location.hash.slice(1)));
