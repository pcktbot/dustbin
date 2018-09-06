// initialize
var xPos = "onmousemove";
var yPos = "onmousemove";
document.onmousemove = moveHandler;

function moveHandler(evt) {
  if (!evt) {
    evt = window.event;
    console.log(true);
  }
// report coordinates to uppleft corner
  xPos = "x: " + String(evt.clientX);
  yPos = "y: " + String(evt.clientY);
  document.getElementById('xpos').innerText = xPos;
  document.getElementById('ypos').innerText = yPos;

// get new pupil positions
  animateEyes(evt.clientX, evt.clientY);
  // animateRightEye(evt.clientX, evt.clientY);
}

function animateEyes(xPos, yPos) {
  var eye = document.getElementById('lefteye');
  var pupil = document.getElementById('leftpupil');
  var inner = document.getElementById('leftinner');
  var pov = document.querySelector('#scaleleft');
  // set the viewframe to the width of the window - border width
  pov.style.width = String(window.innerWidth - 4) + "px";
  pov.style.height = String(
   ( (window.innerWidth - 4) * 
    inner.offsetHeight / 
    inner.offsetWidth ) +
    pupil.offsetHeight / 2
  ) + "px";
  pov.style.top = String(
    document.querySelector('.face').offsetTop +
    eye.offsetTop +
    inner.offsetTop +
    (inner.offsetHeight / 2) - 
    (pov.offsetHeight / 2) + 
    (pupil.offsetHeight / 2)
  ) + "px";
    
  
  pupil.style.left = String(
    inner.offsetWidth / 2 - (pupil.offsetWidth / 2)
  ) + "px";
  pupil.style.top = String(
    inner.offsetHeight / 2 - (pupil.offsetHeight / 2)
  ) + "px";
  if (yPos < (pov.offsetTop - 2)) {
    pupil.style.top = String(0) + "px";
  } else {
    pupil.style.top = String(
      yPos * inner.offsetHeight / window.innerHeight
    ) + "px";
  }
  // calculate new from old
  // xNew = window.innerWidth * xPos / inner.offsetWidth;
  // yNew = window.innerHeight * yPos / inner.offsetHeight;
  // write new to css value
  // pupil.style.top = String(yNew) + "px";
  // pupil.style.left = String(xNew) + "px";
}
function newEyePos(curPos, eyePos) {
  return Math.min();
}

lefteye.style.right = window.innerWidth / 2