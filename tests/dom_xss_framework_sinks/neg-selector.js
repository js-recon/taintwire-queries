const id = location.hash.slice(1);
$("#menu-item-" + id).addClass("active");
$(`a[name="${id}"]`).focus();
