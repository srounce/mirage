// jshint node:true

module.exports = function(grunt) {
  path = require('path');

  require("time-grunt")(grunt);

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt-tasks'),
    jitGrunt: {}
  });
};
