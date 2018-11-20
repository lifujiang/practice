/*
* @Author: shen
* @Date:   2018-10-21 17:55:17
* @Last Modified by:   shen
* @Last Modified time: 2018-10-21 18:03:53
*/
// diy功能
$(function(){
	$("#rbtn").on("click",function(){
		$("ul").css("animation-play-state","running");
	});
	$("#pbtn").on("click",function(){
		$("ul").css("animation-play-state","paused");
	});
})
