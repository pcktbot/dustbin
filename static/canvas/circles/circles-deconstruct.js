const settings = {
    pointCount: 10,
    startSpeed: 1.3,
    availableColors: ['#F1D900','#5DE450','#FF0040']
};
let context;
let objects;
// setting a var to an empty block, eventually takes the event object from the EventListener
let mousePos = {};

const canvas = document.createElement('canvas');
/*
Is this the same as
function init() {}
?
Certainly behaves like a function.
*/
const init = () => {
    // does init automatically have access to canvas and objects because of how they were declared?
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    objects = [];

    document.body.appendChild(canvas);
    // a canvas thing. also context in the function?
    context = canvas.getContext('2d');
    
    for (let i = 0; i <= settings.pointCount; i++) {
        // a pattern for generating circles with random parameters then organizes them to match the class Point
        let plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
        let plusOrMinusY = Math.random() < 0.5 ? -1 : 1;

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const z = Math.random() * - 150;

        const v = {
            x: plusOrMinusX * Math.random() * settings.startSpeed,
            y: plusOrMinusY * Math.random() * settings.startSpeed,
            z: Math.random() * settings.startSpeed * 4,
        };

        const colorIndex = Math.floor(
            Math.random() * settings.availableColors.length
        );
        /*
        Then the class is used. 
        objects is [] before entering the loop.
        */
        objects.push(
            new Point(canvas, settings.availableColors[colorIndex], x, y, z, v)
        );
    }
}
class Point {
    constructor(canvas, color, x, y, z, v) {
      this.canvas = canvas;
      this.color = color;
      this.x = x;
      this.y = y;
      this.z = z;
      this.v = v;
      this.radius = this.calulateRadius();
    }
// dropped these in. dont know everything.
    calulateRadius() {
      return Math.abs(this.z / 120);
    }
    calculatePosition() {
        const diameter = 2 * this.radius;
  
        if (
          this.x > this.canvas.width ||
          this.y > this.canvas.height ||
          this.x + diameter < 0 ||
          this.y + diameter < 0
        ) {
          this.x = this.canvas.width / 2;
          this.y = this.canvas.height / 2;
          this.z = -40;
        }
  
        this.radius = this.calulateRadius();
  
        this.x += this.v.x;
        this.y += this.v.y;
        this.z += this.v.z;
      }
// a lot of class specific functions follow
    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}
const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(object => {
      object.calculatePosition();
    });
    object.draw(context);
};
init();
