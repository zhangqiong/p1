/**
 * Created by zq on 2015/12/15.
 */
var killed=sessionStorage.killed.split(",");
var voted=sessionStorage.voted.split(",");
var array=sessionStorage.array.split(",");
killed.length--;
voted.length--;
console.log(killed);
console.log(voted);
for(i=0;i<killed.length;i++){
    document.write("<div class='log'><h5>第"+(i+1)+"天</h5>晚上："+(killed[i]-0+1)+"号被杀死，身份是"+array[killed[i]]+"<br>");
    if(i<voted.length){
        document.write("白天："+(voted[i]-0+1)+"号被投死，身份是"+array[voted[i]]+"<br></div>");
    }else{
        document.write("</div>");
    }
}
