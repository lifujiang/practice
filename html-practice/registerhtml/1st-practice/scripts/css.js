/* 
* @Author: anchen
* @Date:   2018-10-12 23:33:01
* @Last Modified by:   anchen
* @Last Modified time: 2018-10-13 00:33:40
*/

$(document).ready(function(){
    $(window).on("load",function(){
        $("td:nth-child(3n+1)").addClass("right");
        $("td:nth-child(3n+2)").addClass("red");
        $("td:nth-child(3n)").addClass("skyblue");
    })
});

