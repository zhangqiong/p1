<meta charset="UTF-8">
<?php
/**
 * Created by PhpStorm.
 * User: zq
 * Date: 2015/12/20
 * Time: 23:23
 */
include 'ora.php';
$opt=new DB_Oracle();

//创建100张桌子
//for($i=1;$i<100;$i++){
//    $obj['id']=$i;
//    $obj['status']=0;
//    $opt->insert('res_table',$obj);
//}

//
for($i=1;$i<50;$i++){
    $obj['id']=$i;
    $obj['name']="菜品".$i;
    switch(rand(1,3)){
        case 1:$obj['unit']="斤";break;
        case 2:$obj['unit']="份";break;
        case 3:$obj['unit']="盘";break;
    }
    $obj['price']=rand(5,100);
    $obj['amount']=rand(1,100);
    $opt->insert("res_item",$obj);
}
