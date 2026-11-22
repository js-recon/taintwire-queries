// HackerOne #396493: hash fragment after #! into a jQuery attribute selector.
var url = location.href;
var hashtag = url.indexOf("#!") != -1 ? decodeURI(url.substring(url.indexOf("#!") + 2)) : false;
if (hashtag) $("a[rel^='" + hashtag + "']").trigger("click");
