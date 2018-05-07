

document.onmousemove = moveHandler;
function moveHandler(evt) {
  if (!evt) {
    evt = window.event;
  }
  document.getElementById('xpos').innerHTML = evt.clientX;
  document.getElementById('ypos').innerHTML = evt.clientY;
  animateEyes(evt.clientX, evt.clientY);
}
function animateEyes(xPos, yPos) {
  var leftEye = document.getElementById('lefteye');
  var leftPupil = document.getElementById('leftpupil');
  // console.log(xPos + leftEye.offsetLeft + ", Top: " + leftEye.offsetTop);
  // console.log(document.getElementById('par1').innerText);
  document.getElementById('par1').innerText = xPos + ", " + leftEye.offsetLeft;
  document.getElementById('par2').innerText = yPos + "," + leftEye.offsetTop;
  console.log("Pupil = " + leftPupil.style.top);
  leftPupil.style.top = String(90 / window.innerHeight * yPos) + "px";
  yNew = 90 / window.innerHeight * yPos;
  leftPupil.style.left = String(110 / window.innerWidth * xPos) + "px";
  xNew = 110 / window.innerWidth * xPos;
  document.getElementById('offset-top').innerText = yNew.toFixed(2);
  document.getElementById('offset-left').innerText = xNew.toFixed(2);
  function newEyePos(curPos, eyePos) {
    // return Math.min(Math.max(curPos, eyePos+3), eyePos+17) + "%";
    // console.log("curPos: " + curPos);
    // console.log("eyePos: " + eyePos);
    // console.log(Math.max(curPos, eyePos));
    return Math.min(
      Math.max(curPos, eyePos+55), eyePos+5
    ) + "px";
  }
// document.getElementById('offset-top').innerText = leftPupil.style.top;

}
var form = document.querySelector('form');
var response = document.querySelector('#response');

form.addEventListener('submit', function(event) {
  var data = new FormData(form);
  console.log(data);
  var output = "";
  for (const input of data) {
    output = input[0] + "=" + input[1] + "\r";
  };
  response.innerText = output;
  event.preventDefault();
}, false);

var buttons = document.getElementsByClassName('btn');
var i = 0;
buttons[0].addEventListener('click', function(event) {

  var tops = document.getElementsByClassName('top');
  tops[i].nextElementSibling.innerText = tops.length - i + " tops found.";
  i++;
})

var fig = document.getElementsByTagName('figure');
var figOutput = document.getElementById('figure-output');


for (var i = 0; i < fig.length; i++) {
  var figName = fig[i].querySelector('div').id;
  var div = document.getElementById(figName);

  div.addEventListener('click', function(e) {
    // console.log(i);
    // console.log("Event Object: " + this);
    // console.log("figName: " + figName + ", div: " + div.innerHTML);
    // console.log('option-' + figName.substring(figName.indexOf('-')+1,figName.length));
    var outId = 'option-' + figName.substring(figName.indexOf('-')+1,figName.length);
    var figOut = document.getElementById(outId);
    // console.log('figOut: ' + figOut.innerHTML);
    figOut.innerHTML = figName.innerHTML;
  });
}

const container = document.querySelector('.tabs')
const primary = container.querySelector('.-primary')
const primaryItems = container.querySelectorAll('.-primary > li:not(.-more)')
container.classList.add('--jsfied')

// insert "more" button and duplicate the list

primary.insertAdjacentHTML('beforeend', `
  <li class="-more">
    <button class="btn" type="button" aria-haspopup="true" aria-expanded="false">
      More &darr;
    </button>
    <ul class="-secondary">
      ${primary.innerHTML}
    </ul>
  </li>
`)
const secondary = container.querySelector('.-secondary')
const secondaryItems = secondary.querySelectorAll('li')
const allItems = container.querySelectorAll('li')
const moreLi = primary.querySelector('.-more')
const moreBtn = moreLi.querySelector('button')
moreBtn.addEventListener('click', (e) => {
  e.preventDefault()
  container.classList.toggle('--show-secondary')
  moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'))
})

let stopWidth = moreBtn.offsetWidth
let hiddenItems = []
const primaryWidth = primary.offsetWidth
primaryItems.forEach((item, i) => {
  if(primaryWidth >= stopWidth + item.offsetWidth) {
    stopWidth += item.offsetWidth
  } else {
    item.classList.add('--hidden')
    hiddenItems.push(i)
  }
})
