/**
 * Created by zq on 2015/11/29.
 */
var set_tb_num=document.getElementById("set_tb_num");
var tb_num=document.getElementById("tb_num");
var payway=document.getElementById("pay_way");
var cpCount=0;
var cdCount=0;
var mbCount=0;
set_tb_num.onclick=getBill;
function getBill(){
    console.log(tb_num.value);
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.open("POST","php/bill.php?t="+Math.random(),false);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("tb_num="+tb_num.value);
    console.log(xmlhttp.responseText) ;

}
function cashPay(){
    var form=document.createElement("form");
    var text1=document.createTextNode("收款：");
    var text2=document.createTextNode("找零：");
    var in1=document.createElement("input");
    var in2=document.createElement("input");
    form.appendChild(text1);
    form.appendChild(in1);
    form.appendChild(text2);
    form.appendChild(in2);
    //if(payway.hasChildNodes()){
    //    payway.replaceChild(form,payway.firstChild);
    //}
    //else{
    if(!cpCount) payway.appendChild(form);
    //}

}
function cardPay(){
    var form=document.createElement("form");
    var text=document.createTextNode("刷卡金额：");
    var text2=document.createElement("input");
    form.appendChild(text);
    form.appendChild(text2);
    //if(payway.hasChildNodes()){
    //    payway.replaceChild(form,payway.firstChild);
    //}
    //else{
    if(!cdCount)payway.appendChild(form);
    //}
}
function memBalancePay(){
    var form=document.createElement("form");
    var text=document.createTextNode("会员卡号");
    var text2=document.createElement("密码");
    var in1=document.createElement("input");
    var psw=document.createElement("input");
    psw.type="password";
    form.appendChild(text);
    form.appendChild(in1);
    form.appendChild(text2);
    form.appendChild(psw);
    if(!mbCount)payway.appendChild(form);
}
