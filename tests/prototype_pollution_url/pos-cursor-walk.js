// lodash-set style: walk the cursor (cur = cur[k]), then write through it
const k = location.hash.slice(1);
let cur = {};
while (cur[k]) cur = cur[k];
cur[k] = true;
