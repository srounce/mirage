module.exports = {
    'default': [
      'sass:build',
      'postcss:build',
      'jshint:scripts',
      'jscs:scripts',
      'concat:build',
      'imagemin:build',
      'watch'
    ],

    'release': [
      'clean:dist',
      'sass:dist',
      'postcss:dist',
      'concat:dist',
      'uglify:dist',
      'imagemin:dist'
    ]
};
