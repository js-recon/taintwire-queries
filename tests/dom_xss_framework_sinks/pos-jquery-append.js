// HackerOne #474656 / #158749: URL value into jQuery DOM insertion.
var pageUrl = window.location.href;
jQuery("#jobs-container .jobs-list").append('<a href="' + pageUrl + '">apply</a>');
var $head = $("head");
$head.prepend('<base href="' + location.hash.slice(1) + '" />');
