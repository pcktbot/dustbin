var canvas;
var context;
var mx = 0;
var my = 0;
var eyes = [
  {
    "centerX": 250,
    "centerY": 250,
    "radius": 150
  }
];

window.onload = function() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.onmousemove = function(evt) { mx = evt.x; my = evt.y };
  tekenFrame();

  canvas.addEventListener('mousemove', (e) => {
    let eyes = document.querySelector('.eyes');
    let mouseX = (eyes.getBoundingClientRect().left);
    let mouseY = (eyes.getBoundingClientRect().top);
    let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
    let rotationDegrees = (radianDegrees * (180/ Math.PI) * -1) + 180;
    eyes.style.transform = `rotate(${rotationDegrees}deg)`
  });

}





function tekenFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < eyes.length; i++) {
    drawEye(eyes[i]);
  };
  // loop
  requestAnimationFrame(tekenFrame);
}
function drawEye(eye) {
  bepaalCoordinaten(eye);

  // clip the eye
  context.save();
  context.beginPath();
  context.arc(eye.centerX, eye.centerY, eye.radius, 0, Math.PI * 2);
  context.clip();

  // eye
  context.beginPath();
  context.arc(eye.centerX, eye.centerY, eye.radius, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();

  // lid
  // context.beginPath();
  // context.arc(eye.centerX + eye.pupilX, eye.centerY + eye.pupilY, eye.radius / 2, 0, Math.PI * 2);
  // context.fillStyle = "#007";
  // context.fill();
  // context.closePath();

  // pupil
  context.beginPath();
  context.arc(eye.centerX + eye.pupilX, eye.centerY + eye.pupilY, eye.radius / 2, 0, Math.PI * 2);
  context.fillStyle = "#000";
  context.fill();
  context.closePath();

  context.restore();
}

function bepaalCoordinaten(eye) {
  // afstand van middenpunt oog tot cursor
  dx = mx - eye.centerX;
  dy = my - eye.centerY;
  // stelling van pythagoras
  c = Math.sqrt((dx*dx) + (dy*dy));

  // afstand middelpunt tot pupil
  r = eye.radius * 0.8;

  // cursor op oog
  if (Math.abs(dx) < r && Math.abs(dy) < r && c < r) {
    r = c;
  }

  // hoek bepalen
  alfa = Math.asin(dy / c);

  // coordinaten op rand cirkel bepalen
  eye.pupilX = Math.cos(alfa) * r;
  // 180 graden fout herstellen
  eye.pupilX = (dx < 0 ? eye.pupilX * -1 : eye.pupilX);
  eye.pupilY = Math.sin(alfa) * r;
}
// context.moveTo(20,20);
// context.lineTo(100,20);
// context.beginPath();
// context.arc(250,250,200,0,2*Math.PI);
// context.stroke();
// context.strokeRect(10,10,50,20);
// context.fillStyle = "RGBA(249, 148, 0, 1.00)";
// context.fillRect(20,20,40,30);
// context.font = "30px Garamond";
// context.fillText('Hello!',15,175);

// document.onmousemove = moveHandler;
// function moveHandler(evt) {
//   if(!evt) {
//     evt = window.event;
//   }
//   centerScale(evt.clientX, evt.clientY);
// }
// function animateEyes(xPos, yPos) {
// }
// function centerScale(xPos, yPos) {
//   var eye = document.getElementById('eye');
//   var pupil = document.getElementById('pupil');
//
//   if (90 / window.innerHeight * yPos < 33) {
//     yNew = 33;
//   } else {
//     yNew = 90 / window.innerHeight * yPos;
//   }
//   pupil.style.top = String(yNew) + "px";
//   document.getElementById('ypos').innerText = yNew.toFixed(2);
//
//   if (110 / window.innerWidth * xPos < 15) {
//     xNew = 15;
//   } else if (110 / window.innerWidth * xPos > 98) {
//     xNew = 98;
//   } else {
//     xNew = 110 / window.innerWidth * xPos;
//   }
//   pupil.style.left = String(xNew) + "px";
//   document.getElementById('xpos').innerText = xNew.toFixed(2);
//
// }
// function newEyePos(curPos, eyePos) {
//   return Math.min();
//   var xPosMax = "8.3px";
// }

// let ufo = document.querySelector('.ufo');
//
// ufo.addEventListener('mousemove', (e) => {
//   let eyes = document.querySelector('.eyes');
//   let mouseX = (eyes.getBoundingClientRect().left);
//   let mouseY = (eyes.getBoundingClientRect().top);
//   let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
//   let rotationDegrees = (radianDegrees * (180/ Math.PI) * -1) + 180;
//   eyes.style.transform = `rotate(${rotationDegrees}deg)`
// });
