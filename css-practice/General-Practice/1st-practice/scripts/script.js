/* 
* @Author: anchen
* @Date:   2018-10-15 12:49:10
* @Last Modified by:   anchen
* @Last Modified time: 2018-10-15 16:28:40
*/

$(document).ready(function(){
    $(".nav li:first")
    .addClass('menu')
    .css("width",73)
    $(".nav li:lt(3):not(:first)")
    .addClass('menu1 a:hover')
    .css("width",85);
    
    $(".nav li:gt(2)")
    .addClass('menu2 a:hover')
    .css("width",73);

});