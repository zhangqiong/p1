/**
 * Created by zq on 2015/12/14.
 */
var wrapper=document.getElementById("wrapper");
var peo_count=sessionStorage.peo_count;
var ks=sessionStorage.ks;
var ks_alive=sessionStorage.ks_alive;
var alive=sessionStorage.alive;
var array=sessionStorage.array.split(",");
var header=document.getElementById("header");
var bubble=document.getElementById("bubble");
var remind=document.getElementById("remind");
var btn=document.getElementById("btn");
var dead=(sessionStorage.killed+sessionStorage.voted).split(",");
var cards;
var killed=-1;
var voted=-1;
var curr_header=sessionStorage.mem_list_header;
header.innerHTML=curr_header;
console.log(curr_header);
console.log("杀手剩"+ks_alive);
console.log("平民剩"+(alive-ks_alive));

//填充
if(curr_header=="法官台本"){
    bubble.style.display="none";
    remind.style.display="none";

    //存储一些信息
    //sessionStorage.remind_show_count=0;
    sessionStorage.curr_stat=0;//当前游戏是第几天

    btn.innerHTML="开始游戏";
}else{
    bubble.style.display="block";
    remind.style.display="block";
    btn.innerHTML="确定";
    if(curr_header=="杀手杀人"){
        remind.firstElementChild.innerHTML="杀";
    }
    else if(curr_header=="投票"){
        remind.firstElementChild.innerHTML="投";
    }
}

//添加成员列表
for(i=0;i<sessionStorage.peo_count;i++){
    wrapper.innerHTML+="<div id='mem_"+i+"' class='card'> <span class='top'>"+array[i]+"</span><span class='bottom'>"+(i+1)+"号</span></div>";
}
cards=document.getElementsByClassName("card");
i=0;

//将死去的人标记为灰色
while(dead[i]!=""){
    cards[dead[i]].firstElementChild.style.backgroundColor="gray";
    i++;
}


//跳转到提示页
function to_remind(){window.location.replace("remind.html");}

//跳转到结果页
function go_result(){
    window.location.replace("result.html");
}

//点击事件
window.onclick=function(e){
    var target= e.target;
    if(target.id=="btn"){
        if(curr_header=="法官台本"){
            to_remind();
        }else{
            var flag=0;
            for(i=0;i<ks.length;i++){
                if(ks[i]==killed||ks[i]==voted){
                    flag=1;
                    break;
                }
            }
            if(flag==1){
                ks_alive--;
                alive--;
                sessionStorage.ks_alive=ks_alive;
                sessionStorage.alive=alive;
            }else{
                alive--;
                sessionStorage.alive=alive;
            }
            console.log(alive-ks_alive);
            if(curr_header=="杀手杀人"){
                if(killed!=-1){
                    sessionStorage.killed+=killed+",";
                }

            }else if(curr_header=="投票"){
                if(voted!=-1){
                    sessionStorage.voted+=voted+",";
                }
            }
            if(ks_alive<=0){
                sessionStorage.win="平民";
                go_result();
            }else if((alive-ks_alive)<=0){
                sessionStorage.win="杀手";
                go_result();
            }else{
                if(curr_header=="杀手杀人"){
                    if(killed!=-1){
                        to_remind();
                    }

                }else if(curr_header=="投票"){
                    if(voted!=-1){
                        to_remind();
                    }
                }
            }
        }
    }
    else if(target.parentNode.classList.length>0 && target.parentNode.classList[0]=="card")
    {
        //console.log("a");
        if(curr_header=="杀手杀人"){
            killed=target.parentNode.id[4];
            for(i=0;i<2;i++){
                if(target.parentNode.childNodes[i].nodeType==1){
                    target.parentNode.childNodes[i].style.backgroundColor="red";
                }
            }
        }
        else if(curr_header=="投票"){
            voted=target.parentNode.id[4];
            for(i=0;i<2;i++){
                if(target.parentNode.childNodes[i].nodeType==1){
                    target.parentNode.childNodes[i].style.backgroundColor="red";
                }
            }
        }

    }
};