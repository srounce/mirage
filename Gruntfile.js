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
          'concat:build'
          //'newer:jscs:all',
          //'newer:jshint:all'
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
          '<%= paths.build %>/**/*.js'
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
          '<%= paths.build %>/**/*.js'
        ]
      }
    },

    // concatenate our files into a single file
    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: [
          '<%= paths.src %>/js/build-progress.js'
        ],
        dest: '<%= paths.build %>/mirage.js'
      },
      dist: {
        src: [
          '<%= paths.src %>/js/build-progress.js'
        ],
        dest: '<%= paths.dist %>/mirage.js'
      },
    },

    // compile our Sass files into CSS
    sass: {
      build: {
        files: {
          '<%= paths.build %>/mirage.css': '<%= paths.src %>/sass/mirage.scss'
        }
      },
      dist: {
        files: {
          '<%= paths.dist %>/mirage.css': '<%= paths.src %>/sass/mirage.scss'
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
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: '**/*.css',
          dist: '<%= paths.dist %>'
        }]
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
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= paths.src %>/images',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= paths.dist %>/'
          }
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.dist %>/**/*',
            '!<%= paths.dist %>/.git{,*/}*'
          ]
        }]
      }
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: '**/*.css',
          dest: '<%= paths.dist %>',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= paths.dist %>/mirage.min.js': '<%= paths.dist %>/mirage.js'
        }
      }
    }
  });

  grunt.registerTask('release', [
    'clean:dist',
    'sass:dist',
    'postcss:dist',
    'concat:dist',
    'cssmin:dist',
    'uglify:dist',
    'imagemin:dist'
  ]);
};
