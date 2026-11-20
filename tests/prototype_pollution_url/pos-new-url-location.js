const query = new URL(location).searchParams.toString();
const store = {};
store[query][name] = value;
