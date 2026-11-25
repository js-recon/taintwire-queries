// Validate every .pgq file, then run each rule on its tests/<rule-id>/pos.js (must fire) and neg.js (must not).
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import * as taintwire from "@js-recon/taintwire";

const root = new URL("..", import.meta.url).pathname;
const pgq = (dir) => readdirSync(join(root, dir)).filter((f) => f.endsWith(".pgq")).map((f) => join(root, dir, f));
const { rules, errors } = await taintwire.loadPgq([...pgq("lib"), ...pgq("rules")]);
for (const e of errors) console.error(`invalid: ${e}`);

const scratch = await taintwire.PookieGraph.open();
const cypherErrors = await taintwire.checkPgqCypher(scratch, rules);
await scratch.close();
for (const e of cypherErrors) console.error(`cypher: ${e}`);

const only = process.argv[2];
let failed = errors.length + cypherErrors.length;
for (const rule of rules) {
    if (only && rule.id !== only) continue;
    const dir = join(root, "tests", rule.id);
    const tests = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".js")).sort() : [];
    for (const [kind, want] of [["pos", true], ["neg", false]]) {
        if (!tests.includes(`${kind}.js`)) {
            console.error(`missing: tests/${rule.id}/${kind}.js`);
            failed++;
        }
        // pos.js plus any pos-<case>.js (likewise neg)
        for (const name of tests.filter((f) => f === `${kind}.js` || f.startsWith(`${kind}-`))) {
            const graph = await taintwire.import(readFileSync(join(dir, name), "utf-8"), { filename: name, parser: "babel" });
            try {
                // <case>.expect.json: the "kind: text" interceptor lines the findings must carry, exactly.
                // Interceptors run only for cases that have one, as they cost a query round per finding.
                const expectFile = join(dir, name.replace(/\.js$/, ".expect.json"));
                const expect = existsSync(expectFile) ? JSON.parse(readFileSync(expectFile, "utf-8")).sort() : null;
                // <case>.confine.json: the same for confinements
                const confineFile = join(dir, name.replace(/\.js$/, ".confine.json"));
                const confine = existsSync(confineFile) ? JSON.parse(readFileSync(confineFile, "utf-8")).sort() : null;
                const sel = (s) => ("cypher" in s ? { ...s, ...(!expect && { interceptors: undefined }), ...(!confine && { confinements: undefined }) } : s);
                const res = await taintwire.runPgq(graph, [{ ...rule, return: rule.return.map(sel) }]);
                const fired = res.findings.length > 0;
                const lines = (key) => [...new Set(res.findings.flatMap((f) => (f[key] ?? []).map((i) => `${i.kind}: ${i.text}`)))].sort();
                const got = lines("interceptors");
                const gotConfine = lines("confinements");
                const intercepts = !expect || JSON.stringify(got) === JSON.stringify(expect);
                const confines = !confine || JSON.stringify(gotConfine) === JSON.stringify(confine);
                const ok = !res.errors.length && fired === want && intercepts && confines;
                if (!ok) failed++;
                console.log(`${ok ? "ok  " : "FAIL"} ${rule.id} ${name} (${res.findings.length} finding(s))${res.errors.map((e) => ` ${e.message}`).join("")}`);
                if (!intercepts) console.log(`     interceptors: got ${JSON.stringify(got)}, want ${JSON.stringify(expect)}`);
                if (!confines) console.log(`     confinements: got ${JSON.stringify(gotConfine)}, want ${JSON.stringify(confine)}`);
            } finally {
                await graph.close();
            }
        }
    }
}
console.log(failed ? `${failed} failure(s)` : `all ${rules.length} rules pass`);
process.exit(failed ? 1 : 0);
