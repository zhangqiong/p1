/**
 * Created by q on 11/11/2015.
 */
var menu_toggle;
var container= document.getElementsByClassName("container")[0];
var menu=document.getElementsByClassName("menu")[0];
var body=document.getElementsByTagName("body")[0];
function showMenu(){

    if(menu_toggle!="on"){
        menu_toggle="on";
        //container.style.left="77vmin";
        body.style.backgroundColor="white";
        container.classList.add("menuOn-container");
        menu.classList.add("menuOn-menu");

        ////动画实现
        //container.style.animationName="showMenu-container";
        //container.style.animationDuration="1s";
        //container.style.animationFillMode="forwards";
        ////chrome Safari
        //container.style.webkitAnimation="showMenu-container 1s forwards";
        ////opera
        //container.style.oAnimation="showMenu-container 1s forwards";
        ////firefox
        //container.style.mozAnimation="showMenu-container 1s forwards";
        //



        ////动画实现
        //menu.style.left="0";
        //menu.style.animationName="showMenu-menu";
        //menu.style.animationDuration="1s";
        //menu.style.animationFillMode="forwards";
        ////chrome Safari
        //menu.style.webkitAnimation="showMenu-menu 1s forwards";
        ////opera
        //menu.style.oAnimation="showMenu-menu 1s forwards";
        ////firefox
        //menu.style.mozAnimation="showMenu-menu 1s forwards";
    }
    else if(menu_toggle!="off"){
        menu_toggle="off";
        //container.style.left="0";

        ////动画实现
        //container.style.animation="hideMenu-container 1s forwards";
        //container.style.oAnimation="hideMenu-container 1s forwards";
        //container.mozAnimation=="hideMenu-container 1s forwards";
        //container.style.webkitAnimation="hideMenu-container 1s forwards";
        //
        //menu.style.animation="hideMenu-menu 1s forwards";
        //menu.style.oAnimation="hideMenu-menu 1s forwards";
        //menu.mozAnimation=="hideMenu-menu 1s forwards";
        //menu.style.webkitAnimation="hideMenu-menu 1s forwards";
        ////body.style.backgroundColor="#f0f0f0";

        container.classList.remove("menuOn-container");
        menu.classList.remove("menuOn-menu");
    }

}
function closeMenu(){

}
