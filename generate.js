const fs = require('fs');
const pug = require('pug');

// need to capture an argument variable, the site name, which will dictate the directory and the css and js filenames.

const compile = pug.conpileFile('template.pug');

var html = compile({
  projectName: 'newProject',
  cssFileName: projectName.downcase() + '.css',
   
});

// fs needs to to read the directory for a list of images
// loop through each image and add the <img> element for each depending on the gallery library in use.

var imgArr = fs.readdirSync('.');
var imgElements = [], i;
for (i=0; i<imgArr.length; i++) {
  imgElements.push('<img src="' + imgArr[i] + '" alt=""/>');
}