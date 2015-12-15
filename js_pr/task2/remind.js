/**
 * Created by zq on 2015/12/14.
 */
var curr_stat=sessionStorage.curr_stat;
console.log(curr_stat);
var day_now=Math.floor(curr_stat/2)+1;
console.log("第"+day_now+"天");

//填充第几天
for(i=0;i<day_now-1;i++){
    var days=document.getElementById("days");
    var day_l=document.getElementById("day1");
    var day=day_l.cloneNode(true);
    for(j=0;j<100;j++){
        if(day.childNodes[j].nodeType==1){
            day.childNodes[j].innerHTML="第"+(i+2)+"天";
            break;
        }
    }
    days.appendChild(day);
}

if(curr_stat%2==0){
    var kill_peo=document.getElementsByClassName("kill_peo")[day_now-1];
    if(kill_peo.addEventListener){
        kill_peo.addEventListener("click",go_kill,false);
    }else{
        kill_peo.onclick=go_kill;
    }
}else{
    //绑定事件
    var vote_peo=document.getElementsByClassName("vote")[day_now-1];
    if(vote_peo.addEventListener){
        vote_peo.addEventListener("click",vote,false);
    }else{
        vote_peo.onclick=vote;
    }
}


//跳转杀人页面
function go_kill(){
    curr_stat++;
    sessionStorage.curr_stat=curr_stat;/*记录此页面出现次数*/
    sessionStorage.mem_list_header="杀手杀人";
    if(kill_peo.addEventListener){
        kill_peo.removeEventListener("click",go_kill,false);
    }else{
        kill_peo.onclick="";
    }
    window.location.replace("mem_list.html");
}





//跳转投票页面
function vote(){
    curr_stat++;
    sessionStorage.curr_stat=curr_stat;
    sessionStorage.mem_list_header="投票";
    if(vote_peo.addEventListener){
        vote_peo.removeEventListener("click",go_kill,false);
    }else{
        vote_peo.onclick="";
    }
    window.location.replace("mem_list.html");
}