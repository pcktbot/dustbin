# Dustbin

A collection of mostly original web design elements and experiments to aid in my personal learning.

## Install

``` bash
git clone https://github.com/pcktbot/dustbin.git
npm install
npm start
```

## SSL in Development

It can be frustrating, especially if you are using authentication, to secure your local development environment. The most successful step by step is on [Freecodecamp.org](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec).

The portion that most tutorials forget is first creating a trusted root certificate prior to generating the server certificates.

I get Secure on Chrome 69 (released Sept 2018), but having issues with Firefox still.

## Features

This was just a collection of static pages, but as of Sept 2018, it is a collection of static pages managed by an Express.js server.

To Do
- Create generator script for taking a single argument and creating a new directory and basic static files with Express router to get there.
  - Seems like Gulp is the thing to use.
- Use an `fs`-type solution to keep track of all the files and create global navigation for them.
- Add markdown support to static rendering engine.
- Add PWA elements, including Service Worker, and code splitting to avoid loading everything all at once.
- Insert shared resources into pages dynamically.
- Get your connectivity test.js running.

## Structure

Templates
- EJS versus Pug
- Deployment via Heroku or my Lightsail server
