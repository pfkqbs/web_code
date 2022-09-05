var count = 0
console.log('加载了闭包')
module.exports = function(){
	count++
	console.log(count)
}