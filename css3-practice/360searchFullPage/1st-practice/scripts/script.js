/*
* @Author: shen
* @Date:   2018-10-25 09:58:01
* @Last Modified by:   shen
* @Last Modified time: 2018-10-25 13:06:50
*/

$(function(){
	$("#fullpage").fullpage({
		sectionsColor:["rgb(13,165,214)","rgb(42,181,97)","rgb(222,137,16)","rgb(22,186,157)","rgb(13,165,214)"],
		afterLoad: function(a,index){
			$(".section").removeClass('current');
			setTimeout(function(){
				$(".section").eq(index-1).addClass('current');
			},300);
		}
	})
})