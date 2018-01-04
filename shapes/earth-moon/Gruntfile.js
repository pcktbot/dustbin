module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'earth-moon.css': 'gr-earth-moon.css',
                }
            }
        },
        watch: {
            styles: {
                files: ['earth-moon.css'],
                tasks: ['autoprefixer']
            }
        }
    });
    grunt.loadNpmTasks('~/node_modules/grunt-autoprefixer');
    grunt.loadNpmTasks('~/node_modules/grunt-contrib-watch');
};