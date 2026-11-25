var q = location.hash.slice(1);
var sel = "#" + q;
$(sel).show();
jQuery(location.hash).addClass("open");
