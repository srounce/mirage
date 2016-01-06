// order is important here
var scripts = [
  'src/javascripts/build-progress.js',
];

module.exports = {
  build: {
    src: scripts,
    dest: 'build/mirage.js'
  },

  dist: {
    src: scripts,
    dest: 'dist/mirage.js'
  },

  options: {
    separator: ';'
  },
};
