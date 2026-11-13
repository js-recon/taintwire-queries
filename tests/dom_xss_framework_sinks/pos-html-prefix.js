const name = new URLSearchParams(location.search).get("name");
$("<div>" + name + "</div>").appendTo("body");
