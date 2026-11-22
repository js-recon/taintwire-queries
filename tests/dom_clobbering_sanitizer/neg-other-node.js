function copy(src, dst) {
    for (var a = 0; a < src.attributes.length; a += 1) dst.setAttribute(src.attributes[a].name, src.attributes[a].value);
    dst.removeAttribute("id");
}
