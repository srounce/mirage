module.exports = {
  build: {
    files: [{
      expand: true,
      cwd: 'src/images',
      src: ['**/*.{png,jpg,jpeg,gif}'],
      dest: 'build'
    }],
    options: {
       optimizationLevel: 2
    }
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'src/images',
      src: ['**/*.{png,jpg,jpeg,gif}'],
      dest: 'dist'
    }],
    options: {
      optimizationLevel: 6
    }
  }
};
