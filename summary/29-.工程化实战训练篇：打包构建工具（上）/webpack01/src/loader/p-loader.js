const $ = require('gogocode');
module.exports = function(source){
	console.log('loader执行')
	const loaderUtils=require("loader-utils");
	let loaderOptions = loaderUtils.getOptions(this) || {};
	// console.log(loaderOptions)
	// console.log(source)
	return source
}