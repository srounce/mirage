/* jshint node: true */

'use strict';

module.exports = function(grunt) {

  // this will report how long our tasks are taking to execute
  require('time-grunt')(grunt);

  // automatically load our Grunt tasks 'just in time'
  // @see https://www.npmjs.com/package/jit-grunt
  require('jit-grunt')(grunt);

  grunt.initConfig({
    paths: {
      src:   './src',
      build: './build',
      dist:  './dist'
    },

    // watch various files for changes and invoke other tasks on a change
    watch: {

      js: {
        files: [
          './Gruntfile.js',
          '<%= paths.src %>/js/**/*.js'
        ],
        tasks: [
          'newer:jscs:all',
          'newer:jshint:all',
          'concat:js:build'
        ]
      },

      sass: {
        files: [
          '<%= paths.src %>/sass/**/*.scss'
        ],
        tasks: [
          'sass:build',
          'postcss:build'
        ]
      },

      images: {
        files: [
          '<%= paths.src %>/images/**/*.{png,jpg,jpeg,gif}'
        ],
        tasks: [
          'imagemin:build'
        ]
      }
    },

    jshint: {
      options: {
        jshintrc: './.jshintrc',
        reporter: require('jshint-stylish')
      },

      all: {
        src: [
          './Gruntfile.js',
          '<%= paths.src %>/js/**/*.js'
        ]
      }
    },

    // check our JavaScript files meet our coding standards
    jscs: {
      options: {
        config: './.jscsrc',
        verbose: true
      },
      all: {
        src: [
          './Gruntfile.js',
          '<%= paths.src %>/js/**/*.js'
        ]
      }
    },

    // concatenate our files into a single file
    concat: {
      options: {
        separator: ';'
      },

      js: {
        build: {
          src: [

          ],
          dest: '<%= paths.build %>/mirage.js'
        }
      }
    },

    // compile our Sass files into CSS
    sass: {
      build: {
        files: {
          '<%= paths.build %>/mirage.scss': '<%= paths.src %>/sass/mirage.scss'
        }
      },
      options: {
        sourceMap: false,
        sourceComments: true,
        includePaths: [
          '<%= paths.src %>/bower_components'
        ]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 2 versions'
            ]
          })
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= paths.build %>',
            src: '**/*.css',
            dest: '<%= paths.build %>'
          }
        ]
      }
    },

    // optimise any images
    imagemin: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= paths.src %>/images',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= paths.build %>/'
          }
        ]
      }
    }
  });
};
