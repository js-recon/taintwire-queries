// Next.js next/script loadScript: the element is appended to the document, so it is not detached
// (an inline script body is the developer's; any HTML-sink concern belongs to other rules).
function loadScript(props) {
  const { src, dangerouslySetInnerHTML, children = "" } = props;
  const el = document.createElement("script");
  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || "";
  } else if (children) {
    el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  } else if (src) {
    el.src = src;
  }
  const text = el.textContent;
  document.body.appendChild(el);
  return text;
}
loadScript({ dangerouslySetInnerHTML: { __html: localStorage.getItem("s") } });
