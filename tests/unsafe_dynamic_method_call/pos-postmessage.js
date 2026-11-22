// HackerOne #691977 (reveal.js): postMessage picks the method to call.
var Reveal = { addKeyBinding: function () {}, slide: function () {} };
window.addEventListener("message", function (event) {
  var data = event.data;
  if (typeof data === "string" && data.charAt(0) === "{") {
    data = JSON.parse(data);
    if (data.method && typeof Reveal[data.method] === "function") Reveal[data.method].apply(Reveal, data.args);
  }
});
