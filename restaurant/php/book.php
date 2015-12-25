<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>预定</title>
</head>
<body>
<?php
//输出传过来的所有值
//foreach($_POST as $name=>$value){
//    echo $name,'=',$value,"<br>";
//}

//包含'ora.php'
include 'ora.php';
$tablename="res_book";
//新建类
$ope=new DB_Oracle();
//获取所有post的值
$obj=$_POST;
//设置默认时区
date_default_timezone_set("PRC");

if($obj['date']=="today"){
    $obj['date']=date("Y-m-d");
}elseif($obj['date']=="tomorrow"){
    $obj['date']=date("Y-m-d",strtotime("+1 day"));
}
$obj['time']="to_date('".$obj['date']." ".$_POST['time']."','yyyy-mm-dd hh24:mi')";
//id自增长
$obj['id']=$ope->count_total($tablename);

//输出obj所有
//foreach($obj as $name=>$value){
//    echo $name,'=',$value,"<br>";
//}

//删除最前面的date项
array_shift($obj);

//构造sql

foreach($obj as $key=>$value){
    if(!strpos($value,"(")){
        $obj[$key]="'".$value."'";
    }
}
$sql="insert into ".$tablename." (".implode(',',array_keys($obj)).") values (".implode(",",$obj).")";

//执行
if($ope->query($sql)){
    echo'<a href="../order.html">点菜</a><br><a href="../index.html">不点菜，直接返回</a>';
};
?>
</body>
</html>
