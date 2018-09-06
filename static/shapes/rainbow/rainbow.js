// viewport width
var vw = void 0;
// viewport height
var vh = void 0;

var xToWidth = function xToWidth(x) {
  // use a power function so that we advance through the smaller widths more slowly
  var width = 4 * Math.pow(x, 1.5);
  // if the width (in percent) would evaluate to less than 1px, set to 1px instead
  return width / 100 * vw < 1 ? '1px' : width + '%';
};

var updateViewportDimensions = function updateViewportDimensions() {
  var viewportDimensions = document.body.getBoundingClientRect();
  vw = viewportDimensions.width;
  vh = viewportDimensions.height;
};

var handleMouseMove = function handleMouseMove(ev) {
  var x = ev.clientX / vw;
  var y = ev.clientY / vh;
  // update CSS vars
  document.documentElement.style.setProperty('--scale', '' + y * 1.5);
  document.documentElement.style.setProperty('--node-width', '' + xToWidth(x));
};

updateViewportDimensions();
window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', updateViewportDimensions);