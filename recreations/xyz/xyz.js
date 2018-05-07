/*
===============================================================

Hi! Welcome to my little playground!

My name is Tobias Bogliolo. 'Open source' by default and always 'responsive',
I'm a publicist, visual designer and frontend developer based in Barcelona.

Here you will find some of my personal experiments. Sometimes usefull,
sometimes simply for fun. You are free to use them for whatever you want
but I would appreciate an attribution from my work. I hope you enjoy it.

===============================================================
*/

//Throttle:
var throttleOn = false;
var actionLock = false;
var throttleTimer = 100;

function throttle(e){
  if(throttleOn){
    actionLock = true;
  };
  if(!actionLock){
    throttleOn = true;
    setTimeout(function(){
      throttleOn = false;
    }, throttleTimer);
    translate(e);
  };
  actionLock = false;
};

//Tracking effect:
var threshold = 20;
var box = $("#box");

function translate(e){
  var xOrigin = box.width() / 2;
  var yOrigin = box.height() / 2;
  var xPivot = (e.clientY - yOrigin) / yOrigin * -threshold;
  var yPivot = (e.clientX - xOrigin) / xOrigin * threshold;
  box.css({
    'transform': 'translate(-50%, -50%) rotateX('+xPivot+'deg) rotateY('+yPivot+'deg)'
  });
};

//Handler:
$(window).mousemove(function(e){
  throttle(e);
});

//Toggle:
$(document).click(function(){
  $('.layer').toggleClass('layer-toggle');
});
