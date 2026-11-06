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
    for (const [kind, want] of [["pos", true], ["neg", false]]) {
        const file = join(root, "tests", rule.id, `${kind}.js`);
        if (!existsSync(file)) {
            console.error(`missing: tests/${rule.id}/${kind}.js`);
            failed++;
            continue;
        }
        const graph = await taintwire.import(readFileSync(file, "utf-8"), { filename: `${kind}.js`, parser: "babel" });
        try {
            const res = await taintwire.runPgq(graph, [rule]);
            const fired = res.findings.length > 0;
            const ok = !res.errors.length && fired === want;
            if (!ok) failed++;
            console.log(`${ok ? "ok  " : "FAIL"} ${rule.id} ${kind} (${res.findings.length} finding(s))${res.errors.map((e) => ` ${e.message}`).join("")}`);
        } finally {
            await graph.close();
        }
    }
}
console.log(failed ? `${failed} failure(s)` : `all ${rules.length} rules pass`);
process.exit(failed ? 1 : 0);
