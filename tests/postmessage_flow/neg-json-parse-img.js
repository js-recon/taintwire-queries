window.addEventListener('message', function(e) {
    var img = document.createElement('img'), box = {element: img};
    var d = JSON.parse(e.data);
    box.element.src = d.url;
    img.src = d.url;
});
