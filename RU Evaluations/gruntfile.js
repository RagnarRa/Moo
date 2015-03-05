module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      foo: {
        src: [
          "src/*.js",
          "src/Services/*.js",
          "src/Directives/*.js",
          "src/Controllers/*.js",
        ],
      },
      options: {
          reporter: require('jshint-stylish'),
          curly:  true,
          immed:  true,
          newcap: true,
          noarg:  true,
          sub:    true,
          boss:   true,
          eqnull: true,
          node:   true,
          undef:  true,
          globals: {
            _:       false,
            jQuery:  false,
            angular: false,
            moment:  false,
            console: false,
            $:       false,
            io:      false
          }
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/chatapp.min.js': ['app.js', 'src/**/*.js']
        } //oll folders undir src.. oll js files.. yfir i chatapp.min.js.. 
      }
    },
	less: {
		development: {
			files: {
				"build/main.css": "css/main.less"
			}
		},
		production: {
			files: {
				"build/main.css": "css/main.less"
			}
		}
	}
  });


  grunt.loadNpmTasks('grunt-contrib-jshint'); 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify', 'less' /* more tasks here */]);
};