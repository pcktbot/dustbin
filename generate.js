'use strict';
const fs = require('fs');
const pug = require('pug');

// need to capture an argument variable, the site name, which will dictate the directory and the css and js filenames.

const compile = pug.conpileFile('template.pug');

let html = compile({
  projectName: 'newProject',
  cssFileName: this.projectName.downcase() + '.css',
  jsFileName: this.projectName.downcase() + '.js'
});

// mkdir projectName
// add files from the compile
// add default libraries like jquery, socket, default css, normalize