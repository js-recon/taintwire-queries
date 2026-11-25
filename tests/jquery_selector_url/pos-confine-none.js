// jQuery skips JavaScript whitespace (\s, including U+00A0) before "<": still HTML
var h = location.hash.substring(1);
$(" " + h + " .item");
