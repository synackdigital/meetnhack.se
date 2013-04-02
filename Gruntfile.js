module.exports = function(grunt) {

  // Paths
  var js_src     = 'src/js/';
  var js_dest    = 'assets/js/';
  var css_src    = 'src/less/';
  var css_dest   = 'assets/css/';
  var cmp_src    = 'components/';

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Init Grunt
  grunt.initConfig({

    // Package info
    pkg: grunt.file.readJSON('package.json'),

    // Copy files
    copy: {
      main: {
        files: [
          {
            src: cmp_src+'lesshat/lesshat.less',
            dest: css_src+'lesshat.less'
          },
          {
            src: cmp_src+'tipsy/src/stylesheets/tipsy.css',
            dest: css_src+'tipsy.less'
          }
        ]
      }
    },

    // Concat task
    concat: {
      main: {
        src: [
          cmp_src+'jquery/jquery.js',
          cmp_src+'jquery.scrollTo/jquery.scrollTo.js',
          cmp_src+'jquery.localScroll/jquery.localScroll.js',
          cmp_src+'tipsy/src/javascripts/jquery.tipsy.js',
          js_src+'main.js'
        ],
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
        files: [css_src+'*.less', css_src+'*/*.less'],
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
                "assets/css/main.min.css" : css_src+'main.less'
            }
        }
    },

    // Watch task
    watch: {
      files: [js_src+'*.js', css_src+'*.less'],
      tasks: ['default'],
      options: {
        nospawn: true
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['copy', 'concat', 'less:compile']);
  grunt.registerTask('dist', ['default', 'less:compress', 'uglify']);
};