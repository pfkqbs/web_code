const $ = require('gogocode');
module.exports = function(source){
	console.log('loader1执行')
	const loaderUtils=require("loader-utils");
	let loaderOptions = loaderUtils.getOptions(this) || {};
	let ast = $(source)
	let target = ast
		.replace('()=>{ $_$ }','(function(){ $_$ })')
		.replace('const $_$ = $_$','var $_$ = $_$')
		.replace('let $_$ = $_$','var $_$ = $_$')
		.generate()
	console.log(target)
	// console.log(loaderOptions)
	// console.log(source)
	// source = source.replace(/let|const/g,'var')
	return target
}