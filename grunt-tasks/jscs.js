// jshint node:true

module.exports = {
  scripts: {
    src: [
      'src/javascripts/**/*.js'
    ],
    options: {
      config: '.jscsrc'
    }
  },

  tooling: {
    src: [
      'Grunfile.js',
      'grunt-tasks/**/*.js'
    ],
    options: {
      config: 'grunt-tasks/.jscsrc'
    }
  },

  options: {
    force: true,
    verbose: true
  },
};
