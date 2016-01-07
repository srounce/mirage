module.exports = {
  build: {
    files: {
      'build/mirage.css': 'src/sass/mirage.scss'
    },
    options: {
      sourceMap: false,
      outputStyle: 'expanded',
      sourceComments: true
    }
  },

  dist: {
    files: {
      'dist/mirage.css': 'src/sass/mirage.scss'
    },
    options: {
      sourceMap: true,
      outFile: 'dist/maps/mirage.css.map',
      outputStyle: 'compressed'
    }
  },

  options: {
    precision: 10
  }
};
