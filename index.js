var child_process = require('child_process').exec;
var gutil = require('gulp-util');
var chalk = require('chalk');
var which = require('which');
var clonedeep = require('lodash.clonedeep');
var map = require('map-stream');
var opts,
	cmd;

//Export the Method
var gulpSassC = function (options, sync) {


	if (!options.hasOwnProperty('destination')) {
		console.warn('No destination added.');
	}

	opts = clonedeep(options || {
		precision: 10,
		sourceMap: false,
		outputStyle: 'nested', //nested, expanded, compact, compressed,
		omitSourceMapUrl: false,
	});

	function checkBinary(cmd, errMsg) {
		try {
			which.sync(cmd);
		} catch (err) {
			console.warn(
				'\n' + errMsg + '\n' +
				'More info: https://github.com/iamdue/gulp-sassc-shell\n'
			);
		}
	}

	function prepareOptionsAndSources(file) {

		var cmd = 'sassc ';

		if (opts.hasOwnProperty('style')) {
			opts.outputStyle = opts.style;
		}

		if (opts.hasOwnProperty('outputStyle')) {
			cmd += '--style ' + opts.outputStyle + ' ';
		}

		if (opts.sourceMap) {
			cmd += '--sourcemap ';
		}

		if (opts.omitSourceMapUrl) {
			cmd += '--omit-map-comment ';
		}

		if (opts.loadPath !== undefined && opts.loadPath !== '') {
			cmd += '--load-path ' + opts.loadPath + ' ';
		}

		if (opts.precision) {
			cmd += '--precision ' + opts.precision + ' ';
		}

		var destinationFileName = gutil.replaceExtension(file.relative, '.css');
		cmd += file.path + ' ' + opts.destination + '/' + destinationFileName;

		return cmd;
	}

	function spawnSassC(cmd) {
		return child_process(cmd, {
			stdio: 'inherit'
		}, function (err, stdout, stderr) {
			if (err) {
				console.warn(err);
			}
			else {
				console.log(stdout);
			}
		}.bind(this));
	}


	function captureOutput(child, output, cmd) {
		child.on('data', function (data) {
			output.write(chalk.stripColor(data));
		});
		child.on('close', function () {
			output.write(chalk.stripColor('Compile finished on command: ' + cmd));
		});
	}

	checkBinary('sassc');

	return map(function (file, cb) {
		cmd = prepareOptionsAndSources(file);
		var sassProcess = spawnSassC(cmd);
		captureOutput(sassProcess, process.stdout, cmd);
	});

};

module.exports = gulpSassC;
