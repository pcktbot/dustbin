// var path = new Path.Circle({
// 	center: view.center,
// 	radius: 30,
// 	strokeColor: 'black'
// });
// function onResize(event) {
// 	path.position = view.center;
// }

// rough.js
var roughCanvas = document.getElementById('rough-canvas');
const rc = rough.canvas(roughCanvas);
var shared = {
  stroke: '#FF007D',
  strokeWidth: 3,
  fill: '#FF007D',
  roughness: 6
};

rc.rectangle(20,20,190,190,shared);
rc.ellipse(300,300,450,300, {
  stroke: '#FF007D',
  strokeWidth: 3,
  fill: '#E7EDE1',
  roughness: 1,
  fillStyle: 'solid'
});
rc.ellipse(300,300,450,150,shared);
rc.circle(300,300,100,shared);
rc.circle(150,300,50,shared);
rc.circle(450,300,25,shared);

var obj = { charged: '0%' };

var JSobject = anime({
  targets: obj,
  charged: '100%',
  round: 2,
  easing: 'linear',
  update: function() {
    var el = document.querySelector('#JSobject pre');
    el.innerHTML = JSON.stringify(obj);
  }
});