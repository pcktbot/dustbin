var c = document.getElementsByName('body'),
    //$ = c.getContext('2d'),
    w = c.width = innerWidth,
    h = c.height = innerHeight,
    lines = [],
    lineCount = 2;

//document.body.appendChild(c).style.display = 'block';

function init() {
  for (var i = 0; i < lineCount; i++)
    lines.push(new Line());
  stage();
  loop();
}

function stage() {
  w = c.width = innerWidth;
  h = c.height = innerHeight;
  $.fillStyle = 'rgba(25, 25, 25, 1)';
  $.fillRect(0, 0, w, h);
}

function Line() {
  this.location = {
    x: Math.random() * w,
    y: Math.random() * h
  };
  this.width = Math.random() * 1 + 0.25;
  this.color = 'hsla('+~~(Math.random() * 360)+', 100%, 75%, 0.90)';
}

function draw() {
  $.fillStyle = 'rgba(50, 50, 50, 0.025)';
  $.fillRect(0, 0, w, h);
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i],
        a = ~~(Math.random() * 4) * 90,
        lL = Math.random() * 15 + 5;
    $.lineWidth = l.width;
    $.strokeStyle = l.color;
    $.beginPath();
    $.moveTo(l.location.x, l.location.y);
    switch(a) {
      case 0:
        l.location.y -= lL;
        break;
      case 90:
        l.location.x += lL;
        break;
      case 180:
        l.location.y += lL;
        break;
      case 270:
        l.location.x -= lL;
        break;
      default:
        break;
    }
    $.lineTo(l.location.x, l.location.y);
    if (l.location.x < 0 || l.location.x > w)
      l.location.x = Math.random() * w;
    if (l.location.y < 0 || l.location.y > h)
      l.location.y = Math.random() * h;
    $.stroke();
  }
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('resize', stage);

init();
