// Must not be confined: each one is a real or possible open redirect.
location.href = new URLSearchParams(location.search).get("u");
var r = new URLSearchParams(location.search), redirect = r.get("redirect"), t = r.get("token");
location.href = location.protocol + "//" + redirect + "/auth/sign-in?token=" + t;
location.href = "/" + location.hash.slice(1); // "/" + "/evil.example"
var x = location.hash.slice(1);
location.assign(`/${x}`);
location.assign("/\\" + x); // "/\\evil.example" navigates off-site too
var locale = window.locale;
location.replace("/".concat(locale, "/", x));
location.replace(location.origin + x); // x = "@evil.example"
location.replace("https://example.com" + x); // x = ".evil.example"
location.replace("java" + x); // x = "script:alert(1)"
location.replace(x + "/news?" + window.q); // the tainted part comes first
