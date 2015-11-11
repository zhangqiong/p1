/**
 * Created by q on 11/11/2015.
 */
var menu;
function showMenu(){

    if(menu!="on"){
        menu="on"
        document.getElementsByClassName("container")[0].style.left="77vmin";
        document.getElementsByTagName("body")[0].style.backgroundColor="white";
    }
    else if(menu!="off"){
        menu="off";
        document.getElementsByClassName("container")[0].style.left="0";
        document.getElementsByTagName("body")[0].style.backgroundColor="#f0f0f0";
    }

}
function closeMenu(){
    if(menu=="on"){
        showMenu();
    }
}
