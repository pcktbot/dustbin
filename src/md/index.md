# Path Module

Super useful Node module for working with file paths. 

Import the path module. It can be added without installing it in the Node interactive environment. For an application, install it as a library using a package manager like npm or yarn.

Then import it into your code.

``` js
const path = require('path')
```

It gets used in places you would normally see a string with a file path in it, `/path/to/file.txt` for example. Instead you could write `path.join('path','to','file.txt')`. Join is one of the more common methods. It's useful especially if you don't know the directory names, just the pattern.

.join() takes a comma separated list as a serioes of nested directories.

.basename() returns the final file or directory in the path. Faster than slicing.

.dirname('./full/path') returns 'full', the parent directory of the current working. Faster than the DOM or jQuery's .parent() or .contains().

.format() converts an object to a string.
.parse() converts a path string into an object.
.posix for unix-style path syntax.

.normalize() 
.relative() takes an absolute path and a relative bit, returns a relative path for the first parameter.

Resolve is the most common path method that I use, especially in Express.js. Portions of the path are added a parameters separated by commas.

.resolve() takes a relative path, returns an absolute one.

Path often uses an environment variable to set the absolute path to the root of the project folder, the `__dirname`, for me it is `/users/davidnave/documents/repos/dustbin` I think.

## Requiring Things

Some other built-ins that are changing over time, but affect this project now are explicitly requiring things, things from modules and are exported.


## Document Management using Markdown Source

I like writing in markdown, the github variety. Takes a little getting used to, but much nicer than text files.

Now I need to find, read, and render these to browser. Packages that did this were my first intro to Node, and they made a positive impression. 

Stuff like Docsify.

I will probably use a template file for the page partial, then use the default app index for the rest. 

```
src/
  views/
    pages/
      index.ejs
    partials/
      head.ejs
      header.ejs
      markdown.ejs
      footer.ejs
```
### A note on template paths

When I switched from Pug to EJS, the Express render path  to `views` got set incorrectly.

Offending line
``` js
app.set('views', path.join(__dirname, 'views'))
// returns 'project-root/views'
```
Better is to say "unnecessary," since setting the `view engine` still finds the right path.
