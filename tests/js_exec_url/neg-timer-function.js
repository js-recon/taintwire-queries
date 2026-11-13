const delay = Number(location.hash.slice(1));
function tick(d) {
    console.log(d);
}
const later = () => tick(delay);
setTimeout(tick.bind(null, delay), 450);
setTimeout(later, delay);
setInterval(tick, delay);
