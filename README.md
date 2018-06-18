# gulp-sassc-shell

> If your SASS compiles slow, then try this plugin, compile SASS to CSS faster then ever before using libsass from Gulp using shell.

## Getting Started
This plugin requires Gulp `~3.9.1`

If you haven't used [Gulp](https://gulpjs.com/) before, 
be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-sassc-shell --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gulpfile with this line of JavaScript or with the matchdep npm package (gulp-*) syntax:

```js
const sassc = require('gulp-sassc-shell');
```

## The sassc task

### Overview
In your project's directory, add a task with any name you want, and select the *scss file from your project, then pipe it to
the plugins function. 

```js
gulp.task('build-cssC', function () {
	return gulp.src('./scss/*.scss').pipe(
		sassc({
			outputStyle: 'nested',
			sourceMap: true,
			precision: 3,
			destination: "css/dist"
		})
	);
});
```

### Options
This plugin only support the options that sassc binary does. These are the following:

#### outputStyle
Alias: `style`
Type: `String`
Default value: `'nested'`

Output style. Can be `nested`, `compact`, `compressed`, `expanded`.

#### precision
Type: `String`
Default value: `'3'`

How many digits of precision to use when outputting decimal numbers.

#### loadPath
Type: `String|Array`

Add a (or multiple) Sass import path.

#### sourceMap
Type: `String`  
Default: `false`

If set to true a sourceMap uri will be injected to the end of the destination file.

#### destination
Type: `String`  
Default: `false`

Destination is a required property to use sassc binary. Sassc binary will get this parameter to generate the css to this directory.

### Usage Examples

#### Default Options

```js
gulp.task('build-cssC', function () {
	return gulp.src('./scss/*.scss').pipe(
		sassc({
			outputStyle: 'nested',
			sourceMap: true,
			precision: 3,
			destination: "css/dist"
		})
	);
});
```

## Contributing
Feedbacks are welcome.
If you want to contribute, send a mail to me: gyorgy.sagi@w5labs.com .

## Release History
0.0.1 - 2018.06.18 - First release

## License

MIT © [Gyorgy Sagi](http://w5labs.com)
