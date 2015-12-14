/**
 * Created by zq on 2015/12/12.
 */
  var btn=document.getElementById("btn");
    var peo_count;
    var killer;
    var array;
    var main=document.getElementById("main");
    var text="";
    var round=document.getElementById("round");
    if(btn.addEventListener){
        btn.addEventListener("click",allot_cha,false);
    }
    btn.onclick=(allot_cha);
//showCha.n=0;

function allot_cha(){
    var pn=document.getElementById("pn");
    peo_count=pn.value-0;
    array=new Array(peo_count);
    killer=Math.ceil(peo_count/5);
    console.log(peo_count,killer);

    console.log(array);
    for(var i=0;i<array.length;i++){
        array[i]=i;
    }
    array.sort(comp);
    console.log(array);
    for(i=0;i<array.length;i++){
        array[i]>killer-1 ? array[i]="平民":array[i]="杀手";
        text+=(i+1)+"号是"+array[i]+"<br>";
    }
    console.log(array);
    main.innerHTML=text;
    btn.innerHTML="玩家查看身份";
    if(btn.addEventListener){
        btn.addEventListener("click",show_cha,false);
    }
    btn.onclick(show_cha);


}
function comp(a,b){
    if(Math.random()>0.5){
        return 1;
    }else{
        return -1;
    }
}
show_cha.n=0;
function show_cha(){
    show_cha.n++;
    //alert(show_cha.n)
    if(show_cha.n%2==1){
        round.innerHTML=Math.ceil(show_cha.n/2);
        round.style.display="block";
        console.log(show_cha.n,show_cha.n%2);
        main.innerHTML="";
        btn.innerHTML="查看"+Math.ceil(show_cha.n/2)+"号身份";
    }else{

        main.innerHTML=show_cha.n/2+"号身份是"+array[show_cha.n/2-1];
        if(show_cha.n>=peo_count*2){
            btn.innerHTML="";
            btn.outerHTML="<a href='task4.html'><button class='footer'>法官点击 </button></a>";
        }else{
            btn.innerHTML="隐藏并传递给下一人";
        }

    }

}
