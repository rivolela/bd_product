module.exports = function(grunt){

	require('jit-grunt')(grunt);

	grunt.initConfig({
		env:{
			dev:{
				NODE_ENV: 'development',
			},
			test:{
				NODE_ENV: 'test',
			},
			prod:{
				NODE_ENV: 'production'
			}
		},
		nodemon:{
			dev:{
				script:'server.js',
				options:{
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js']
				}
			},
			debug:{
				script:'server.js',
				options:{
					nodeArgs:['--debug'],
					ext:'js,html',
					watch:['server.js','config/**/*.js','app/**/*.js']
				}
			}
		},
		mochaTest:{
			//src:'app/tests/mocha/utile/requests.server.utile.tests.js',
			//src:'app/tests/mocha/controllers/offer.server.controller.tests.js',
			// src:'app/tests/mocha/models/*.js',
			src:'app/tests/mocha/**/*.js',
			options:{
				reporter:'spec'
			}
		},
		jshint:{
			options:{
				esversion:6
			},
			all:{
				src:['server.js',
					'config/**/*.js',
					'app/**/*.js']
			}
		},
		watch:{
			js:{
				files:['server.js',
						'config/**/*.js',
						'app/**/*.js'],
				tasks:['jshint']
			},
		},
		concurrent:{
			dev:{
				tasks:['nodemon','watch'],
				options:{
					logConcurrentOutput:true
				}
			},
			debug:{
				tasks:['nodemon:debug','watch','node-inspector'],
				options:{
					logConcurrentOutput:true
				}
			}
		},
		'node-inspector':{
			debug:{}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-contrib-less');


	grunt.registerTask('server','Start a custom web server in development', function() {
    	//grunt.log.writeln('Started web server on port 3000');
    	require('./server.js');
	});

	grunt.registerTask('default',['env:dev']);
	grunt.registerTask('dev',['env:dev','jshint','concurrent:debug']);
	grunt.registerTask('mocha',['env:test','server','mochaTest']);
	grunt.registerTask('job',['env:test_job','server','watch']);
	// grunt.registerTask('dev',['env:dev','server','watch']);

	grunt.registerTask('test',['env:test','jshint','server','mochaTest']);

	// grunt.registerTask('lint',['jshint','csslint']);
};





