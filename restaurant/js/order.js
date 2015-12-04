/**
 * Created by zq on 2015/11/29.
 */
var dishes_list=document.getElementById("dishes_list");
function addDash(){
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var in1=document.createElement("input");
    in1.type="text";
    var in2=document.createElement("input");
    in2.type="number";
    td1.appendChild(in1);
    td2.appendChild(in2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    dishes_list.appendChild(tr);
    tr.onclick= function () {
        addDash();
    }
}