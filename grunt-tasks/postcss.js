module.exports = {
  build: {
    src: 'build/*.css'
  },

  dist: {
    src: 'dist/*.css'
  },

  options: {
    map: false,
    processors: [
      require('autoprefixer')
    ]
  },
};
