# taintwire-queries

PookieGraph query files (`.pgq`) for [taintwire](https://taintwire.js-recon.io): Cypher selectors and rules that find client-side vulnerabilities in JavaScript bundles.

```bash
js-recon taintwire build -d output/example.com -o example.pg
js-recon taintwire analyze -g example.pg -q taintwire-queries/rules
```

## Layout

| Path | What's there |
| --- | --- |
| `lib/sources.pgq` | Taint sources shared by the rules: URL reads, `window.name`, response bodies, stored values, `Math.random()`, ... |
| `lib/postmessage.pgq` | Message listeners and their `event.data` reads, chained with `uses` |
| `rules/<id>.pgq` | One rule per file. Each file exports its sink selector as `sink`, and the rule as its default export. |
| `tests/<id>/pos.js`, `neg.js` | A snippet the rule must report, and one it must not |

The 31 rules started as the taintwire rules of [js-recon-rules](https://github.com/js-recon/js-recon-rules), with the same queries.

## Writing a rule

A `.pgq` file is TypeScript. Import types with `import type`, and other `.pgq` files with a relative path:

```ts
import type { PGRule, PGSelector } from "@js-recon/taintwire";
import { urlRead } from "../lib/sources.pgq";

export const sink: PGSelector = {
    from: urlRead,
    cypher: { query: `MATCH (c:CallExpression)-[:SON {key: 'callee'}]->(f:Identifier), (c)-[a:SON {key: 'arguments'}]->(n)
WHERE f.name = 'eval' AND a.idx = 0
RETURN n.id AS id, n.file AS file, n.line AS line, n.col AS col` },
};

export default {
    id: "my_rule",
    name: "URL value reaches eval()",
    severity: "high",
    message: "URL value reaches eval()",
    return: [sink],
} satisfies PGRule;
```

See [Query files (pgq)](https://taintwire.js-recon.io/next/api/pgq) for the format and the sandbox the files run in. Add `tests/<id>/pos.js` and `neg.js`, then run:

```bash
npm install
npm test            # every rule
npm test -- my_rule # one rule
js-recon taintwire validate -q .
```

`npm test` needs Node.js 22.18 or newer. `.vscode/settings.json` makes VS Code treat `.pgq` as TypeScript.
