module.exports = function(grunt) {

  // Paths
  var src = 'src/js/';
  var dist = 'assets/js/';
  var cmp = 'components/';

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Init Grunt
  grunt.initConfig({

    // Package info
    pkg: grunt.file.readJSON('package.json'),

    // Concat task
    concat: {
      dist: {
        src: [cmp+'jquery/jquery.js', src+'main.js'],
        dest: dist+'main.js'
      },
      modernizr: {
        src: [cmp+'modernizr/modernizr.js'],
        dest: dist+'modernizr.js'
      }
    },

    // Uglify task
    uglify: {
      main: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                  ' * <%= pkg.website %>/\n' +
                  ' *' +
                  ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>' +
                  ' <%= pkg.license %> */\n'
        },
        src: dist+'main.js',
        dest: dist+'main.min.js'
      },
      modernizr: {
        options: {
          banner: '/*' +
                  ' * Modernizr v2.6.2' +
                  ' * www.modernizr.com' +
                  ' *' +
                  ' * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton' +
                  ' * Available under the BSD and MIT licenses: www.modernizr.com/license/' +
                  ' */\n'
        },
        src: cmp+'modernizr/modernizr.js',
        dest: dist+'modernizr.min.js'
      }
    },

    // Watch task
    watch: {
      files: [src+'*.js'],
      tasks: ['default'],
      options: {
        nospawn: true
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('dist', ['default', 'uglify']);
};