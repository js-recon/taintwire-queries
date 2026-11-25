var lang = new URLSearchParams(location.search).get("lang");
img.src = "/img/flags/" + lang + ".png";
frame.src = location.origin + "/embed?ref=" + encodeURIComponent(document.referrer);
