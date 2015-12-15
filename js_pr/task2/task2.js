/**
 * Created by zq on 2015/12/12.
 */
    var btn=document.getElementById("btn");
    var peo_count;//玩家数
    var killer;//杀手数
    var ks="";//杀手列表
    var array;/*分配身份用的*/
    var main=document.getElementById("main");
    var round=document.getElementById("round");
    if(btn.addEventListener){
        btn.addEventListener("click",allot_cha,false);
    }
    btn.onclick=allot_cha;

//分配身份
function allot_cha(){
    var pn=document.getElementById("pn");
    var text="";
    peo_count=pn.value-0;
    if(peo_count>2&&peo_count<19){
        array=new Array(peo_count);
        killer=Math.ceil(peo_count/5);
        for(var i=0;i<array.length;i++){
            array[i]=i;
        }
        array.sort(comp);
        for(i=0;i<array.length;i++){
            if(array[i]>killer-1){
                array[i]="平民";
            }else{
                array[i]="杀手";
                ks+=i+",";
            }
            text+=(i+1)+"号是"+array[i]+"<br>";
        }
        main.innerHTML=text;
        btn.innerHTML="玩家查看身份";
        if(btn.addEventListener){
            btn.addEventListener("click",show_cha,false);
        }
        btn.onclick(show_cha);
    }

}

//随机排序
function comp(a,b){
    if(Math.random()>0.5){
        return 1;
    }else{
        return -1;
    }
}
show_cha.n=0;

//查看身份
function show_cha(){
    show_cha.n++;
    if(show_cha.n%2==1){
            round.innerHTML=Math.ceil(show_cha.n/2);
            round.style.display="block";
            main.innerHTML="";
            btn.innerHTML="查看"+Math.ceil(show_cha.n/2)+"号身份";
    }else{
        console.log(show_cha.n,show_cha.n%2);
        if(show_cha.n>=peo_count*2){
            btn.innerHTML="法官点击";
            btn.removeEventListener("click",show_cha,false);
            btn.onclick=function(){
                //存储一些信息
                sessionStorage.ks=ks;//杀手列表
                sessionStorage.peo_count=peo_count;//总人数
                sessionStorage.array=array;//身份存储
                sessionStorage.mem_list_header="法官台本";//玩家列表页的标题
                sessionStorage.alive=peo_count;//存活人数
                sessionStorage.ks_alive=killer;//杀手存活数
                sessionStorage.killer=killer;//杀手数
                sessionStorage.killed="";//被杀的人列表
                sessionStorage.voted="";//被投死的人列表


                window.location.replace("mem_list.html");
            }
        }else{
            btn.innerHTML = "隐藏并传递给下一人";
        }
        main.innerHTML = show_cha.n / 2 + "号身份是" + array[show_cha.n / 2 - 1];
    }

}

