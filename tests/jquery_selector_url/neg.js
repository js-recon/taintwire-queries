// Constant selector, and a URL value used as a $() argument directly (dom_xss_framework_sinks' case, not this rule's).
$("a[rel^='nav']").trigger("click");
var id = location.hash.slice(1);
$(document).find("#menu").attr("data-id", id);
