const action = new URLSearchParams(location.search).get("action");
handlers[action]();
