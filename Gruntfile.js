module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      js:{
        files: ['app/js/**/*.*'],
        tasks: []
      },
      scss:{
        files: ['scss/**.scss'],
        tasks: ['sass:dist']
      },
      final:{
        files:['app/css/app.css', 'app/index.html', 'app/**/**.js'],
        tasks:["build"]
      }
    },
    sass:{
      dist:{
        files:{
          "app/css/app.css": "scss/app.scss"
        }
      }
    },
    copy:{
      js:{
        src: 'temp/app.min.js',
        dest: 'dist/app.js'
      },
      css:{
        src: 'temp/app.min.css',
        dest: 'dist/app.css'
      },
      index:{
        src: 'temp/index.html',
        dest: 'dist/index.html'
      },
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/js/vendor/**.js', 'app/js/**.js'],
        dest: 'temp/app.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'temp/app.min.js': ['temp/app.js']
        }
      }
    },
    cssmin:{
      dist:{
        files:{
          'temp/app.min.css':['app/css/app.css']
        }
      }
    },
    processhtml:{
      dist: {
        files: {
          'temp/index.html':['app/index.html']
        }
      }
    },
    htmlmin:{
      dist:{
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files:{
          'temp/index.html':'temp/index.html'
        }
      }
    },
    clean:{
      temp:{
        src:['temp']
      }
    },
    'http-server':{
      dev:{
        root:'dist',
        runInBackground: true,
        port:4000,
        showDir: true
      }
    }
  });


  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', []);

  grunt.registerTask('build',['clean:temp', 'concat:dist', 'uglify:dist', 'cssmin:dist', 'processhtml:dist', 'htmlmin:dist', 'copy:js', 'copy:css', 'copy:index', 'clean:temp']);

  grunt.registerTask('dev', ['http-server', 'build', 'watch'])

};