var leftPos = "onmousemove";
var rightPos = "onmousemove";

document.onmousemove = moveHandler;

function moveHandler(evt) {
  if (!evt) {
    evt = window.event;
    console.log(true);
  }
  // console.log(leftPos,rightPos);
  leftPos = "x: " + String(evt.clientX);
  rightPos = "y: " + String(evt.clientY);
  document.getElementById('leftpos').innerText = leftPos;
  document.getElementById('rightpos').innerText = rightPos;
  animateEyes(evt.clientX,evt.clientY);
}

function animateEyes(xPos, yPos) {
  var leftEye = document.getElementById('lefteye');
  var leftPupil = document.getElementById('leftpupil');
  var rightEye = document.getElementById('righteye');
  var rightPupil = document.getElementById('rightpupil').style;
  console.log(leftPupil.style.top);
  document.getElementById('leftpupil').innerHTML = leftPupil.top;
  // leftPupil.left = newEyePos(xPos, leftEye.offsetLeft);
  // // console.log("leftPupil.top: "+leftPupil.top);
  // leftPupil.top = newEyePos(yPos, leftEye.offsetTop);
  //
  // function newEyePos(curPos, eyePos) {
  //   // return Math.min(Math.max(curPos, eyePos+3), eyePos+17) + "%";
  //   // console.log("curPos: " + curPos);
  //   // console.log("eyePos: " + eyePos);
  //   // console.log(Math.max(curPos, eyePos));
  //   return Math.min(
  //     Math.max(curPos, eyePos+3), eyePos+17
  //   ) + "px";
  }
