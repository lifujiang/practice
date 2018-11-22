/*
* @Author: shen
* @Date:   2018-11-17 12:12:36
* @Last Modified by:   lifujiang
* @Last Modified time: 2018-11-22 10:16:07
*/

$(function(){
	header_scroll();
	swiper();
	countdown();
})
////////////////
// 搜索栏滚动改变透明度 //
////////////////
var header_scroll = function(){
	var transparent = 0;
	var index_search = $('#index_search');
	// 监听窗口滚动事件
	$(window).scroll(function(){
		// 获取窗口滚动高度
		transparent = $(window).scrollTop()/320;
		if(transparent < 0.85){
			index_search.css('background','rgba(209,55,56,'+transparent+')');
		} else {
			index_search.css('background','rgba(209,55,56,0.85');
		}
	})
}
/////////
// 轮播图 //
/////////
var swiper = function(){
	var index = 1;
	var imgbox = $('#index_banner_img');
	var width = $('#index_banner_img li').width();
	// 封装动画效果函数
	var setTransform = function(d){
		return{
				"transform":"translateX("+d+"px)",
				"-webkit-transform":"translateX("+d+"px)"
			};
	}
	var setTransition = function(){
		return{
			"transition":"all .2s linear",
			"-webkit-transition":"all .2s linear"
		}
	}
	var removeTransition = function(){
		return{
			"transition":"none",
			"-webkit-transition":"none"
		}
	}
	// 结束封装动画效果函数

	// 设置定时器制作轮播图
	var timer = setInterval(function(){
		index++;
		imgbox.css(setTransition());
		imgbox.css(setTransform(-index*width));
	},1000);
	// 通过监听过渡完成时间,实现无缝衔接
	imgbox.on('transitionend',function(){
		// 自动轮播无缝衔接
		// 原理为当轮播图的最后一张图完成过渡效果，立即定位到第一张实现无缝衔接
		if(index == 9){
			index = 1;
			imgbox.css(removeTransition());
			imgbox.css(setTransform(-index*width));
		}

		// 手势操作无缝衔接
		if(index == 0){
			index = 8;
			imgbox.css(removeTransition());
			imgbox.css(setTransform(-index*width));
		}
		// 指示器无缝衔接
		$('#index_banner_spot li:eq('+(index-1)+')').addClass('active_spot').siblings().removeClass('active_spot');
	});
	var startX = 0;
	var distance = 0;
	// 设置变量判断是否有滑动
	var isMove = false;
	imgbox.on("touchstart",function(e){
		startX = e.touches[0].clientX;
		// 手指点触清楚定时器
		clearInterval(timer);
	});
	imgbox.on("touchmove",function(e){
		isMove = true;
		moveX = e.touches[0].clientX
		// 通过初始位置与移动位置得出移动距离
		distance = moveX - startX;
		// 清除过渡并根据移动距离设置容器偏离
		imgbox.css(removeTransition());
		imgbox.css(setTransform(-index*width+distance));
	});
	imgbox.on("touchend",function(e){
		// 判断设备是否被点击并滑动
		if(isMove){
			// 如果滑动距离超过屏幕1/3则切换轮播图，否则将吸附回去
			if(Math.abs(distance) <= width/3){
				imgbox.css(setTransition());
				imgbox.css(setTransform(-index*width));
			} else {
				// 根据移动距离正负值判断手势滑动方向
				distance>0?index--:index++;
				imgbox.css(setTransition());
				imgbox.css(setTransform(-index*width));
			}
		}
		// 重新设置定时器
		timer = setInterval(function(){
			index++;
			imgbox.css(setTransition());
			imgbox.css(setTransform(-index*width));
		},1000);
		// 初始化变量
		startX = 0;
		distance = 0;
		isMove = false;
	});
}


var countdown = function(){
	// 初始化总时间和时、分、秒
	var time = 3*3600;
	var [h,m,s] = [0,0,0];
	var li = $('#seckill_time li');
	h = Math.floor(time / 3600);
	m = Math.floor(time % 3600 / 60);
	s = time % 60;
	li.eq(0).html(Math.floor(h/10));
	li.eq(1).html(h%10);
	li.eq(3).html(Math.floor(m/10));
	li.eq(4).html(m%10);
	li.eq(6).html(Math.floor(s/10));
	li.eq(7).html(s%10);
	time--;
	setInterval(function(){
		h = Math.floor(time / 3600);
		m = Math.floor(time % 3600 / 60);
		s = time % 60;
		li.eq(0).html(Math.floor(h/10));
		li.eq(1).html(h%10);
		li.eq(3).html(Math.floor(m/10));
		li.eq(4).html(m%10);
		li.eq(6).html(Math.floor(s/10));
		li.eq(7).html(s%10);
		time--;
	},1000);
}
