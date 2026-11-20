const query = new URL("https://example.com/?a=b").searchParams.toString();
const store = {};
store[query][name] = value;
