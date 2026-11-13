// a storage probe and a sampling id, not secrets
const probe = `probe-${Math.random()}`;
localStorage.setItem(probe, probe);
localStorage.removeItem(probe);
localStorage.setItem("sampleBucket", String(Math.random()));
const cache = new Map();
cache.set("sessionKey", Math.random());
