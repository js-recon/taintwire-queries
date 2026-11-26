// Next.js head-manager reactElementToDOM: textContent is only written (the other branch), never read back.
function reactElementToDOM({ type, props }) {
  const el = document.createElement(type);
  for (const p in props) if (p !== "children" && p !== "dangerouslySetInnerHTML") el.setAttribute(p.toLowerCase(), props[p]);
  const { children, dangerouslySetInnerHTML } = props;
  if (dangerouslySetInnerHTML) el.innerHTML = dangerouslySetInnerHTML.__html || "";
  else if (children) el.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  return el;
}
reactElementToDOM({ type: "style", props: { dangerouslySetInnerHTML: { __html: location.hash } } });
