# taintwire-queries

PookieGraph query files (`.pgq`) for [taintwire](https://taintwire.js-recon.io): Cypher selectors and rules that find client-side vulnerabilities in JavaScript bundles.

```bash
js-recon taintwire build -d output/example.com -o example.pg
js-recon taintwire analyze -g example.pg -q taintwire-queries/rules
```

## Layout

| Path | What's there |
| --- | --- |
| `lib/pga.pgq` | PookieGraph aliases: short names for the Cypher fragments queries repeat (`${pga.callee}`, `${pga.methodCall()}`, `${pga.ret("p.name")}`, ...) |
| `lib/sinks.pgq` | Sink queries shared by two or more rules, as lists to spread into `cypher:`: `htmlSinks`, `scriptSinks`, `storageSinks`, `navigationSinks`, ... |
| `lib/sources.pgq` | Taint sources shared by the rules: URL reads, `window.name`, response bodies, stored values, `Math.random()`, ... |
| `lib/postmessage.pgq` | Message listeners and their `event.data` reads, chained with `uses` |
| `lib/interceptors.pgq` | What could stop a value at a sink: the conditions the tainted value must pass (enclosing `if`/ternary, `&&`/`\|\|`, early `return`) and the checks inside them (`indexOf`, `startsWith`, regex tests, ...). Every rule's sink lists them in `interceptors`. |
| `rules/<id>.pgq` | One rule per file. Each file exports its sink selector as `sink`, and the rule as its default export. |
| `tests/<id>/pos.js`, `neg.js` | A snippet the rule must report, and one it must not. Extra cases go in `pos-<case>.js` and `neg-<case>.js`. |
| `tests/<id>/<case>.expect.json` | Optional: the exact `"kind: text"` interceptor lines that case's findings must carry, such as `"if: must be true"`. Interceptors run only in cases that have one. |

The 31 rules started as the taintwire rules of [js-recon-rules](https://github.com/js-recon/js-recon-rules), with the same queries.

## Writing a rule

A `.pgq` file is TypeScript. Import types with `import type`, and other `.pgq` files with a relative path:

```ts
import type { PGRule, PGSelector } from "@js-recon/taintwire";
import { pga } from "../lib/pga.pgq";
import { urlRead } from "../lib/sources.pgq";
import { storageSinks } from "../lib/sinks.pgq";

export const sink: PGSelector = {
    from: urlRead,
    cypher: [
        // fn(v): pga.call() binds the call c and the function name f
        { query: `MATCH ${pga.call()}, (c)${pga.arguments("a")}(n)
WHERE f.name = 'eval' AND a.idx = 0 AND NOT n.type IN ${pga.literals}
${pga.ret("f.name")}` },
        ...storageSinks, // and every shared storage sink
    ],
};

export default {
    id: "my_rule",
    name: "URL value reaches eval() or storage",
    severity: "high",
    message: "URL value reaches eval() or storage",
    return: [sink],
} satisfies PGRule;
```

[PookieGraph aliases (pga)](https://taintwire.js-recon.io/next/api/pga) lists every alias and sink set. See [Query files (pgq)](https://taintwire.js-recon.io/next/api/pgq) for the format and the sandbox the files run in. Add `tests/<id>/pos.js` and `neg.js`, then run:

```bash
npm install
npm test            # every rule
npm test -- my_rule # one rule
js-recon taintwire validate -q .
```

`npm test` needs Node.js 22.18 or newer. `.vscode/settings.json` makes VS Code treat `.pgq` as TypeScript.
