// initialize
// var xPos = "onmousemove";
// var yPos = "onmousemove";
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
  animateLeftEye(evt.clientX, evt.clientY);
  // animateRightEye(evt.clientX, evt.clientY);
}

function animateRightEye(xPos, yPos) {
  // get right eye and pupil from DOM
  var eye = document.getElementById('righteye');
  var pupil = document.getElementById('rightpupil').style;

// calc new pupil y-position with boundaries
  if (90 / window.innerHeight * yPos < 33) {
    yNew = 33;
  } else {
    yNew = 90 / window.innerHeight * yPos;
  }
  pupil.style.top = String(yNew) + "px";

// calc new pupil x-position with boundaries
  if (380 / window.innerWidth * xPos < 10) {
    xNew = 10;
  } else if (380 / window.innerWidth * xPos > 350) {
    xNew = 350;
  } else {
    xNew = 380 / window.innerWidth * xPos;
  }
  pupil.style.left = String(xNew) + "px";

}

  function animateLeftEye(xPos, yPos) {
    var eye = document.getElementById('lefteye');
    var pupil = document.getElementById('leftpupil');

    if (90 / window.innerHeight * yPos < 33) {
      yNew = 33;
    } else {
      yNew = 90 / window.innerHeight * yPos;
    }
    pupil.style.top = String(yNew) + "px";
    document.getElementById('ypos').innerText = yNew.toFixed(2);

    if (380 / window.innerWidth * xPos < 10) {
      xNew = 10;
    } else if (380 / window.innerWidth * xPos > 280) {
      xNew = 280;
    } else {
      xNew = 380 / window.innerWidth * xPos;
    }
    pupil.style.left = String(xNew) + "px";
    // document.getElementById('xpos').innerText = xNew.toFixed(2);

  }
  function newEyePos(curPos, eyePos) {
    return Math.min();
    var xPosMax = "8.3px";
  }
