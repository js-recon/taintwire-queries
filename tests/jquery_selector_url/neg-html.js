// A string starting with "<" is HTML, reported by dom_xss_framework_sinks.
$("<div>" + location.hash + "</div>").appendTo("body");
