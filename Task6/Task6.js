/**
 * Created by zq on 11/18/15.
 */
var song=document.getElementById("song");
var songPlaying=false;
function songSwitch(){
    if(songPlaying){
        song.pause();
        songPlaying=false;
        //alert("pause");
    }else if(!songPlaying){
        song.play();
        songPlaying=true;
        //alert("playing");
    }
}

//var voteButton=document.getElementsByClassName("voteButton");
//var vb;
//for(vb in voteButton){
//    voteButton[vb].style.backgroundColor="yellow";
//    voteButton[vb].addEventListener("click",showTool);u
//    voteButton[vb].addEventListener()
//}

var tool=document.createElement("div");
var img=new Array();
for(i=0;i<4;i++){
    img[i]=document.createElement("img");
}
img[0].src="images/pen.png";
tool.appendChild(img[0]);
img[1].src="images/find.png";
tool.appendChild(img[1]);
img[2].src="images/quan.png"
img[3].src="images/add.png"
tool.appendChild(img[2]);
tool.appendChild(img[3]);
//tool.appendChild()
function showTool(item){
    //alert("工具");
    //item.style.backgroundColor="red";
    item.appendChild(tool);
}
