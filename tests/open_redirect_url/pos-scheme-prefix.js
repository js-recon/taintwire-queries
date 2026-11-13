const host = new URLSearchParams(location.search).get("host");
location.href = "https://" + host;
