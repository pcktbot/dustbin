const pug = require('pug');
let templateFile = 'cube.pug'; 
const compile = pug.compileFile(templateFile);
console.log(compile({
  // set values for template variables
  // prints a string of html 
}));
