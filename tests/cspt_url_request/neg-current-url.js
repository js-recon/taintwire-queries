// whatwg-fetch style: an empty URL means "the current page"
function fixUrl(url) {
    return url === "" && location.href ? location.href : url;
}
fetch(fixUrl(""));
