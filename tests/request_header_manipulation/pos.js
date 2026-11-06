const xhr = new XMLHttpRequest();
xhr.setRequestHeader("X-Token", location.hash.slice(1));
