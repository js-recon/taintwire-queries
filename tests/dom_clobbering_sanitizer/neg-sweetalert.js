// SweetAlert2 setInputAttributes (macartemode-dk 3b019dc.js): the library's own popup inputs, built from its constant template.
var sweetHTML = '<div class="swal2-popup"><input class="swal2-input"><select class="swal2-select"></select></div>';
function init() { var container = document.createElement("div"); container.innerHTML = sweetHTML; document.body.appendChild(container); }
function getInput(type) { return document.querySelector(".swal2-popup .swal2-" + type); }
function setInputAttributes(types, params) {
    for (var D = 0; D < types.length; D++) {
        var k = getInput(types[D]);
        if (k) {
            for (var I in k.attributes)
                if (k.attributes.hasOwnProperty(I)) {
                    var N = k.attributes[I].name;
                    "type" !== N && "value" !== N && k.removeAttribute(N);
                }
            for (var L in params.inputAttributes) k.setAttribute(L, params.inputAttributes[L]);
        }
    }
}
init();
setInputAttributes(["input", "select"], {});
