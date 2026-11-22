document.cookie = 'returnTo=' + encodeURIComponent(location.href) + '; path=/';
localStorage.setItem('returnTo', window.location.href);
document.cookie = 'page=' + location.pathname;
