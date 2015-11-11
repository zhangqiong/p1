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
        container.style.left="77vmin";
        container.style.animationName="showMenu-container";
        container.style.animationDuration="1s";
        container.style.animationFillMode="forwards";
        body.style.backgroundColor="white";
        menu.style.animationName="showMenu-menu";
        menu.style.animationDuration="1s";
        menu.style.animationFillMode="forwards";
    }
    else if(menu_toggle!="off"){
        menu_toggle="off";
        container.style.left="0";

        container.style.animation="hideMenu-container 1s forwards";
        menu.style.animation="hideMenu-menu 1s forwards";
        //body.style.backgroundColor="#f0f0f0";
    }

}
function closeMenu(){

}
