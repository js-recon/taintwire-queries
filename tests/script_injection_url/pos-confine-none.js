// Script text is code, not a URL: a "?" in it doesn't make a query
var s = document.createElement("script");
s.text = "var page = '/list?q=" + location.hash.slice(1) + "';";
