const m = window.location.href.match(/[?&]next=([^&]+)/);
if (m) window.location = decodeURIComponent(m[1]);
