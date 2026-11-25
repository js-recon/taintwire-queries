// The source is two opaque calls deep (URLSearchParams, then .get)
var t = new URLSearchParams(location.search).get("menu_id");
t && jQuery(`#menu-item-${t} a:first`).click();
var h = location.hash.substring(1);
$('div a[name="' + h + '"]').addClass("active");
