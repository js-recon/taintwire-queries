// HackerOne #398054 (Marketo forms on hackerone.com): jQuery message listener, data read through originalEvent.
function onMessage(e) {
  if (e.originalEvent && e.originalEvent.data) {
    var d = $.parseJSON(e.originalEvent.data);
    document.getElementById("form").innerHTML = d.html;
  }
}
$(window).on("message", onMessage);
