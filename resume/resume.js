/**
 * Created by zq on 2015/12/3.
 */
var rows=document.getElementsByClassName("row");
var points=document.getElementsByClassName("point");
scrollFunc.prensent=0;

function set_row(index){
    go_next(scrollFunc.prensent,scrollFunc.prensent=index);
}

function go_next(now,next){
    rows[now].style.transition="top .8s";
    rows[now].style.zIndex="9";
    rows[next].style.transition="top 0s";
    rows[next].style.zIndex="8";
    rows[now].classList.remove("present_row");
    points[now].classList.remove("present_p");
    rows[next].classList.add("present_row");
    points[next].classList.add("present_p");
}

function go_previous(now,previous){
    rows[now].style.transition="top 0s .8s";
    rows[now].style.zIndex="8";
    rows[previous].style.transition="top .8s";
    rows[previous].style.zIndex="9";
    rows[now].classList.remove("present_row");
    points[now].classList.remove("present_p");
    rows[previous].classList.add("present_row");
    points[previous].classList.add("present_p");
}

function scrollFunc(e){
    e=e||window.event;
    var derict= 0;
    if(e.wheelDelta){
        derict=e.wheelDelta;
        if(derict<0){
            go_next(scrollFunc.prensent,scrollFunc.prensent=(scrollFunc.prensent+1)%7);
        }else if(derict>0){
            if(scrollFunc.prensent<1) {return;}
            go_previous(scrollFunc.prensent,--scrollFunc.prensent);
        }
    }else if(e.detail){
        derict=e.detail;
        if(derict>0){
            go_next(scrollFunc.prensent,scrollFunc.prensent=(scrollFunc.prensent+1)%7);
        }else if(derict<0){
            if(scrollFunc.prensent<1) {return;}
            go_previous(scrollFunc.prensent,--scrollFunc.prensent);
        }
    }
}
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,true);
}
//else if(document.attachEvent){
//    document.attachEvent('onmousewheel',scrollFunc);
//}
//else{
    window.onmousewheel=scrollFunc;
//}


