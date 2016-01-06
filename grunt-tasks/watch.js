var scripts = 'src/javascripts/**/*.js';
var styles  = 'src/sass/**/*.scss';
var images  = 'src/images/**/*.{png,gif,jpeg,jpg}';
var tooling = ['Grunfile.js', 'grunt-tasks/**/*.js'];

module.exports = {
  scripts: {
    files: [scripts],
    tasks: [
      'jshint:scripts',
      'jscs:scripts',
      'concat:build'
    ]
  },

  styles: {
    files: [styles],
    tasks: [
      'sass:build',
      'postcss:build'
    ]
  },

  images: {
    files: [images],
    tasks: ['imagemin:build']
  },

  tools: {
    files: [tooling],
    tasks: [
      'jshint:tooling',
      'jscs:tooling'
    ]
  },

  options: {
    debounceDelay: 0
  }
};
