/*
* @Author: shen
* @Date:   2018-10-24 14:06:32
* @Last Modified by:   shen
* @Last Modified time: 2018-10-24 14:45:05
*/

$(function(){
	var index = 0;
	var flag = true;
	$(".next").on("click",function(){
		if(flag) {
			flag = false;
			index--;
			$("li").each(function(key,value){
				$(this).css({
					"transform":"rotateX("+90*index+"deg)",
					"transition-delay":key*0.3+"s"
				});
			});
			setTimeout(function(){
				flag = true;
			},1500)
		}
	})
	$(".prev").on("click",function(){
		if(flag) {
			flag = false;
			index++;
			$("li").each(function(key,value){
				$(this).css({
					"transform":"rotateX("+90*index+"deg)",
					"transition-delay":1.2-(key*0.3)+"s"
				});
			});
			setTimeout(function(){
				flag = true;
			},1500)
		}
	})

})