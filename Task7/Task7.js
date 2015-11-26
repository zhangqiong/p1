/**
 * Created by ZQ on 2015/11/25.
 */
function showBorderShadow(item){
    item.classList.add("shadow");
}
function hideBorderSHadow(item){
    item.classList.remove("shadow");
}
var pics=document.getElementsByClassName("carousel_pic");
var curr_pic=0;
function next_pic(){
    var next_pic=(1+curr_pic)%3;
    pics[curr_pic].style.animation="left-out 1s forwards";
    pics[curr_pic].style.oAnimation="left-out 1s forwards";
    pics[curr_pic].style.mozAnimation="left-out 1s forwards";
    pics[curr_pic].style.webkitAnimation="left-out 1s forwards";
    pics[curr_pic].classList.remove("curr");
    pics[next_pic].style.oAnimation="right-in 1s forwards";
    pics[next_pic].style.mozAnimation="right-in 1s forwards";
    pics[next_pic].style.webkitAnimation="right-in 1s forwards";
    pics[next_pic].style.animation="right-in 1s forwards";
    pics[next_pic].classList.add("curr");
    curr_pic=next_pic;
}
function last_pic(){
    var last_pic=(2+curr_pic)%3;
    pics[curr_pic].style.animation="right-out 1s forwards";
    pics[curr_pic].classList.remove("curr");
    pics[last_pic].style.animation="left-in 1s forwards";
    pics[last_pic].classList.add("curr");
    curr_pic=last_pic;
}