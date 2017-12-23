module.exports = function(grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	copy: {
	    main: {
		files: [
		    {expand: true, cwd: 'bower_components/bootstrap/', src: ['less/*.less', 'img/*'], dest: 'src/', filter: 'isFile'}, // includes files in path
		    {expand: true, cwd: 'bower_components/bootstrap/js/', src: ['*.js'], dest: 'src/js/bootstrap/', filter: 'isFile'}, // includes files in path
		    {expand: true, cwd: 'bower_components/jquery/', src: ['jquery.js'], dest: 'src/js/', filter: 'isFile'},
		    {expand: true, cwd: 'bower_components/font-awesome/font/', src: ['*'], dest: 'build/font/', filter: 'isFile'}
		    //{src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
		    //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
		    //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
		]
	    }
	},

	less: {
	    compile: {
		options: {
		    paths: ["assets/css",
			    "bower_components/bootstrap/less",
			    "bower_components/font-awesome/less"
			   ]
		},
		files: {
		    "build/css/style.css": "public/stylesheets/style.less"
		}
	    }
	},


	concat: {
	    options: {
		// define a string to put between each file in the concatenated output
		separator: ';'
	    },
	    dist: {
		// bootstrap{
		// // the files to concatenate
		// src: ['src/js/bootstrap/*.js'],
		// // the location of the resulting JS file
		// dest: 'build/js/bootstrap.js'
		// },
		// jquery{
		// // the files to concatenate
		// src: ['src/js/jquery.js'],
		// // the location of the resulting JS file
		// dest: 'build/js/jquery.js'
		// }
		files: {
		    'build/js/ck/bootstrap.js': ['src/js/bootstrap/*.js'],
		    'build/js/ck/jquery.js': ['src/js/jquery.js']
		}
	    }
	},
	uglify: {
	    options: {
		// the banner is inserted at the top of the output
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	    },
	    dist: {
		files: {
		    'build/js/min/bootstrap.min.js': ['build/js/ck/bootstrap.js'],
		    'build/js/min/jquery.min.js': ['build/js/ck/jquery.js']
		}
	    }
	},
	jshint: {
	    // define the files to lint
	    files: ['gruntfile.js'],
	    // configure JSHint (documented at http://www.jshint.com/docs/)
	    options: {
		smarttabs: true,
		// more options here if you want to override JSHint defaults
		globals: {
		    jQuery: true,
		    console: true,
		    module: true
		}
	    }
	},
	latex: {
	    pdf_target: {
		options: {
		    outputDirectory: 'dest/pdf'
		},
		src: ['document.tex']
	    }
	},
	watch: {
	    files: ['<%= jshint.files %>'],
	    tasks: ['jshint', 'concat', 'uglify']
	},

        pdf2png: {
            all: {
                files: [
                    { src: ['teaching/**/*.pdf', 'research/**/*.pdf'] }
                ]
            }
        }
    });

    grunt.loadTasks('tasks');
    
    // Load libs
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-latex');

    // Register the default tasks
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    
    // Register building task
    grunt.registerTask('build', ['copy']);
};
