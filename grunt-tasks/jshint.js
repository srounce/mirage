module.exports = {
  scripts: {
    src: [
      'src/javascripts/**/*.js'
    ],
    options: {
      jshintrc: '.jshintrc'
    }
  },

  tooling: {
    src: [
      'Grunfile.js',
      'grunt-tasks/**/*.js'
    ],
    options: {
      jshintrc: 'grunt-tasks/.jshintrc'
    }
  },

  options: {
    force: true
  }
};
