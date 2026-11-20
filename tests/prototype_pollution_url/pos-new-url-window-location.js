const u = new URL(window.location);
const store = {};
store[u.searchParams.get("k")][name] = value;
