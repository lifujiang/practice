/*
* @Author: shen
* @Date:   2018-11-16 13:14:20
* @Last Modified by:   shen
* @Last Modified time: 2018-11-16 13:41:42
*/

$(function(){
	new Swiper('.swiper-container',{
		autoplay: true,
		speed: 1000,
		loop: true,
		pagination: {
			el: '.swiper-pagination'
		}
	})
})