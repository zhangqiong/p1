/**
 * Created by zq on 2015/11/29.
 */
var dishes_list=document.getElementById("dishes_list");
addDash.count=0;
function addDash(){
    addDash.count++;
    //localStorage.order_dishes_count=addDash.count;
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var in1=document.createElement("input");
    in1.type="text";
    in1.classList.add("dish_num");
    in1.name="item"+addDash.count;
    var in2=document.createElement("input");
    in2.type="number";
    in2.name="num"+addDash.count;
    in2.value=1;
    td1.appendChild(in1);
    td2.appendChild(in2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    dishes_list.firstElementChild.appendChild(tr);
    td1.onclick= function () {
        addDash();
    }
}

function clear_form(){
    var dish_nums=document.getElementsByClassName("dish_num");
   for(var i=0;i<dish_nums.length;i++){
       if(dish_nums[i].value==""){
           dish_nums[i].parentNode.parentNode.parentNode.removeChild(dish_nums[i].parentNode.parentNode);
       }
   }
}