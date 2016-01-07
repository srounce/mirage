// order is important here
var scripts = [
  'dist/mirage.js',
];

module.exports = {
  dist: {
    files: {
      'dist/mirage.min.js': scripts
    },
    options: {
      sourceMap: true,
      sourceMapName: 'dist/mirage.js.map',
      compress: {
        drop_console: true
      },
      mangleProperties: true,
      reserveDOMProperties: true,
      preserveComments: false,
      wrap: true
    }
  }
};
