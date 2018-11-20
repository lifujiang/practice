/*
* @Author: shen
* @Date:   2018-11-11 21:49:02
* @Last Modified by:   shen
* @Last Modified time: 2018-11-14 00:02:56
*/

$(function(){
	/*产品导航栏滚动条*/
	new IScroll(".navbox",{
		scrollX:true,
		scrollY:false
	});
	/*轮播图功能*/
	banner();
	/*初始化tips*/
	$('.wei').tooltip();
	$('.gui').tooltip();
})

var banner = function(){
	var get_data = function(callback){
		// 缓存数据
		if(window.data){
			callback && callback(window.data);
		} else {
			$.ajax({
				type:"get",
				url:"./scripts/data.json",
				dataType:"json",
				success:function(data){
					window.data = data;
					callback && callback(window.data);
				}
			})
		}
	}

	var bar_img = function(){
		/*将拿到的数据写入模板引擎*/
		get_data(function(data){
		var isMobile = $(window).width() < 768 ? true : false;
		/*传入数据*/
		var imghtml = template("bannerImg",{data:data,isMobile:isMobile});
		var dothtml = template("bannerDot",{data:data});
		/*渲染页面*/
		$('.carousel-inner').html(imghtml);
		$('.carousel-indicators').html(dothtml);
		})
	}
	/*监听页面尺寸改变*/
	/*resize()等于trigge('resize'))*/
	$(window).on("resize",function(){
		bar_img();
	}).resize();

	/*手势操作*/

	var startX = 0;
	var moveX = 0;
	var isMove = false;
	$(".carousel-inner").on("touchstart",function(e){

		startX = e.originalEvent.touches[0].clientX;
	})
	.on("touchmove",function(e){
		isMove = true;
		moveX = e.originalEvent.touches[0].clientX - startX;
	})
	.on("touchend",function(){
		if(isMove && Math.abs(moveX) > 50){
			if(moveX > 0){
				$('.carousel').carousel("prev");
			} else {
				$('.carousel').carousel("next");
			}
		}
	})
	var startX = 0;
	var moveX = 0;
	var isMove = false;
}

