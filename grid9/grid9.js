/**
 * Created by zq on 2015/12/12.
 */
window.onload=function(){
    var blocks=document.getElementsByClassName("block");

    function change_color(){
        var to_c=Math.random()*10;
        to_c=Math.round(to_c)%3;
        //alert(to_c);

        switch (to_c){
            case 0:blocks[change_color.i].className="block red";console.log("格子"+change_color.i+"变成红色");break;
            case 1:blocks[change_color.i].className="block green";console.log("格子"+change_color.i+"变成绿色");break;
            case 2:blocks[change_color.i].className="block blue";console.log("格子"+change_color.i+"变成蓝色");break;
        }

        change_color.i=(Math.round(Math.random()*100))%9;
    }
    change_color.i=0;
    setInterval(change_color,1000);

};