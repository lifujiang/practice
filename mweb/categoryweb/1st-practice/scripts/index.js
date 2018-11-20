/*
* @Author: shen
* @Date:   2018-11-02 10:57:18
* @Last Modified by:   shen
* @Last Modified time: 2018-11-02 17:49:55
*/

window.onload = function(){
	// document.querySelector(".left").addEventListener("touchmove",function(e){
	// 	e.preventDefault();
	// })
	// document.querySelector(".right").addEventListener("touchmove",function(e){
	// 	e.preventDefault();
	// })
	new IScroll(document.querySelector('.left'),{
		scrollX: false,
		scrollY: true
	});
	new IScroll(document.querySelector('.right'), {
		scrollX: true,
		scrollY: false
	});
}