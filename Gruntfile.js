module.exports = function(grunt) {

  // Paths
  var js_src     = 'src/js/';
  var js_dest    = 'assets/js/';
  var less_src   = 'src/less/';
  var cmp_src    = 'components/';

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Init Grunt
  grunt.initConfig({

    // Package info
    pkg: grunt.file.readJSON('package.json'),

    // Concat task
    concat: {
      main: {
        src: [cmp_src+'jquery/jquery.js', cmp_src+'jquery.scrollTo/jquery.scrollTo.js', cmp_src+'jquery.localScroll/jquery.localScroll.js', js_src+'main.js'],
        dest: js_dest+'main.js'
      },
      modernizr: {
        src: [cmp_src+'modernizr/modernizr.js'],
        dest: js_dest+'modernizr.js'
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
        src: js_dest+'main.js',
        dest: js_dest+'main.min.js'
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
        src: cmp_src+'modernizr/modernizr.js',
        dest: js_dest+'modernizr.min.js'
      }
    },

    // LESS task
    less: {
        files: [less_src+'*.less', less_src+'*/*.less'],
        compile: {
            files: {
                "assets/css/main.css" : 'src/less/main.less'
            }
        },
        compress: {
            options: {
                yuicompress: true
            },
            files: {
                "assets/css/main.min.css" : less_src+'main.less'
            }
        }
    },

    // Watch task
    watch: {
      files: [js_src+'*.js', less_src+'*.less'],
      tasks: ['default'],
      options: {
        nospawn: true
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['concat', 'less:compile']);
  grunt.registerTask('dist', ['default', 'uglify', 'less:compress']);
};