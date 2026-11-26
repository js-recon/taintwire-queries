# Changelog

## Unreleased

### Added

- Interceptors (`lib/interceptors.pgq`): each finding of a taint rule lists the conditions a payload must pass before the sink (guards and the checks inside them).
- Confinements: each finding lists the fixed structure around the tainted value, such as a same-origin path, a query string, a selector prefix, or a sink API that confines its argument.
- New rule `dom_clobbering_sanitizer`: an HTML sanitizer filters attributes through `node.attributes`, which a named form control can clobber (TWQ-5).
- New rule `innerhtml_detached_decode`: tags are stripped or entities decoded through a detached element's `innerHTML` (TWQ-6).
- New rule `jquery_selector_url`, plus jQuery insertion sinks, jQuery message listeners and `obj[k].apply` dispatch (TWQ-6).
- `storage_url` also reports the whole page URL written raw to `document.cookie`.
- `new URL(location)`, `new URLSearchParams(location)` and regex parts of the whole page URL are URL sources.

### Fixed

- `innerhtml_detached_decode` needs a source now. The value written to the element's `innerHTML` must come from the URL, `window.name`, a postMessage, an HTTP response or storage, so the rule also gets interceptors. The rule also requires two more things:
    - The text must be read back. A `d.textContent = ...` write, such as the one in the other branch of Next.js `head-manager`'s `reactElementToDOM`, doesn't count.
    - The element must stay detached. An element passed to `appendChild`, `insertBefore`, `append`, `prepend`, `replaceWith`, `before`, `after`, `replaceChildren` or jQuery's `appendTo`/`prependTo`/`insertAfter` is not reported. `next/script` is one example.

  In the jsr-taintwire-v2 run this rule had 561 findings, all false positives (TWQ-9).
- `dom_clobbering_sanitizer` only reports nodes of a tree parsed from markup. That means the flow must start at one of these:
    - an element whose `innerHTML` gets a non-literal;
    - `parseFromString`;
    - `createHTMLDocument`;
    - a `<template>`'s `content`;
    - the parameter of a same-file method that one of these is passed to, as in HTMLJanitor's `this._sanitize(sandbox, root)`.

  The flow reaches the node itself, or what it is iterated from (`for…of`, `.forEach`, `Array.prototype.forEach.call`). Hydration (Svelte `claim_element`, Preact), a library's own elements (SweetAlert2, Cloudflare Rocket Loader) and other non-parsed nodes are no longer reported. The rule also skips two more cases:
    - `x.attributes.<name>` other than `length`/`item`/`getNamedItem`, which is not a `NamedNodeMap` (`r.attributes.tokens`);
    - a sanitizer that removes a disallowed node itself (`x.remove()`, `x.parentNode.removeChild(x)`) when nothing in the file allows `form` (Bootstrap 3/4/5 `sanitizeHtml`).

  In the jsr-taintwire-v2 run this rule had 170 findings, all false positives (TWQ-9).
- WebSocket, EventSource and BroadcastChannel `onmessage` handlers are not postMessage sources.
- `prototype_pollution_url` matches the cursor-walk sink `cur = cur[key] = v` (jQuery deparam).

## 0.1.0 - 2026-11-18

Initial release.
