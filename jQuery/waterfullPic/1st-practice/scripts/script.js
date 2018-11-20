/* 
* @Author: anchen
* @Date:   2018-10-12 11:48:53
* @Last Modified by:   anchen
* @Last Modified time: 2018-10-12 14:19:23
*/

$(document).ready(function(){
    $(window).on("load",function(){
        show();
    })
});

function show(){
    var box = $(".box");
    var picwidth = box.eq(0).width();
    var picnum = Math.floor($(window).width() / picwidth);
    var picarr = [];
    var picheight = "";
    box.each(function(index,value){
        picheight = $(".box").eq(index).height();
        if(index<picnum){
            picarr.push(picheight);
        } else {            
            var minpicheight = Math.min.apply(null,picarr);
            var minpicindex = $.inArray(minpicheight, picarr);
            $(value).css({
                position:"absolute",
                top:minpicheight,
                left:box.eq(minpicindex).position().left
            });
            picarr[minpicindex] += box.eq(index).height();
        }
        
    })
    console.log();

}