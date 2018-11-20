/*
* @Author: shen
* @Date:   2018-10-27 15:18:26
* @Last Modified by:   shen
* @Last Modified time: 2018-11-17 22:28:15
*/

window.onload = function(){
	search_color();
	banner();
	countdown();
}

// 搜索栏改变颜色

var search_color = function(){
	var banner = document.querySelector(".banner");
	var height = banner.offsetHeight;
	var search_bar = document.querySelector(".search_box");
	window.onscroll = function(){
		var scroll = window.pageYOffset;
		var opacity =0;
		if(scroll <= height){
			opacity = scroll / height * 0.85;
		} else {
			opacity = 0.85;
		}
		search_bar.style.background = "rgba(186,21,34," + opacity + ")"
	}
}





//////////
// 轮播核心 //
//////////
var banner = function(){
	/////////////
	// 轮播封装函数 //
	/////////////
	var setTransition = function(){
	imgbox.style.transition = "all .1s";
	imgbox.style.webkitTransition = "all .1s";
	}

	var removeTransition = function(){
		imgbox.style.transition = "none";
		imgbox.style.webkitTransition = "none";
	}

	var setTransform = function(translateX){
		imgbox.style.transform = "translateX("+(translateX)+"px)";
		imgbox.style.webkitTransform = "translateX("+(translateX)+"px)";
	}

	var banner = document.querySelector(".banner");
	var index = 1;
	var width = banner.offsetWidth;
	var imgbox = banner.querySelector("ul:first-child");
	var whitespotul = banner.querySelector("ul:last-child");
	var whitespot = whitespotul.querySelectorAll("li");
	// 设置定时器
	var timer = setInterval(function(){
		index++;
		setTransition();
		setTransform(-index*width);
	},1000);
	/////////////////////
	// 监听transition事件 //
	/////////////////////
	imgbox.addEventListener("transitionend",function(){
		// 轮播图无缝效果，当第10张（索引为9）过渡完成时瞬间切换至第一张
		if(index >= 9){
			index = 1;
			removeTransition();
			setTransform(-index*width);
		}

		// 手势切换无缝效果
		if(index <= 0){
			index = 8;
			removeTransition();
			setTransform(-index*width);
		}

		for(var i=0; i<whitespot.length; i++){
			whitespot[i].classList.remove('active');
		}
		whitespot[index-1].classList.add('active');
	})

	var Tstart = 0;
	var Tdistance = 0;
	var isMove = false;

	//////////////
	// 触摸切换轮播图 //
	//////////////
	imgbox.addEventListener("touchstart",function(e){
		clearTimeout(timer);
		Tstart = e.touches[0].clientX;
	});
	imgbox.addEventListener("touchmove",function(e){
		// 根据手势移动的距离和开始位置相比
		// 得出容器移动了多少像素
		var Tmove = e.touches[0].clientX;
		Tdistance = Tmove - Tstart;
		removeTransition();
		setTransform(-index*width+Tdistance);
		isMove = true;
	});
	imgbox.addEventListener("touchend",function(){
		// 判断是否移动
		if(isMove){
			// 如果移动距离不足1/3则吸附回去
			if(Math.abs(Tdistance) < width/3){
				setTransition();
				setTransform(-index*width);
			} else {
				if(Tdistance < 0){
					index++;
				} else {
					index--;
				}
				setTransition();
				setTransform(-index*width);
			}
		}
		Tstart = 0;
		Tdistance = 0;
		isMove = false;
		clearTimeout(timer);
		timer = setInterval(function(){
			index++;
			setTransition();
			setTransform(-index*width);
		},3000);
	});
}

///////////
// 倒计时功能 //
///////////

var countdown = function(){
	var time = 2*60*60;
	var h, m, s;
	var spans = document.querySelectorAll('.time span');
	h = Math.floor(time / 3600);
	m = Math.floor(time % 3600 / 60);
	s = time % 3600 % 60;
	spans[0].innerHTML = Math.floor(h / 10);
	spans[1].innerHTML = h % 10;
	spans[3].innerHTML = Math.floor(m / 10);
	spans[4].innerHTML = m % 10;
	spans[6].innerHTML = Math.floor(s / 10);
	spans[7].innerHTML = s % 10;
	time--;
	setInterval(function(){
		h = Math.floor(time / 3600);
		m = Math.floor(time % 3600 / 60);
		s = time % 3600 % 60;
		spans[0].innerHTML = Math.floor(h / 10);
		spans[1].innerHTML = h % 10;
		spans[3].innerHTML = Math.floor(m / 10);
		spans[4].innerHTML = m % 10;
		spans[6].innerHTML = Math.floor(s / 10);
		spans[7].innerHTML = s % 10;
		time--;
	},1000);
}




















