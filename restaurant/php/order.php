<!DOCTYPE html>
<html>
<head lang="zh-CN">
<meta charset="UTF-8">
<title>点菜</title>
</head>
<body>
<?php
include 'ora.php';
foreach($_POST as $name=>$value){
    echo $name."=".$value;
    echo "<br>";
}
$opt=new DB_Oracle();
$bill_obj['tab_id']=$_POST['tb_num'];

date_default_timezone_set("PRC");
$bill_obj['time']="to_date('".date('Y-m-d H:i')."','yyyy-mm-dd hh24:mi')";
$bill_obj['settled']=0;
$bill_obj['id']=$opt->count_total("res_bill");
foreach($bill_obj as $key=>$value){
    echo $key.'='.$value.'<br>';
}
foreach($bill_obj as $key=>$value){
    if(!strpos($value,'(')){
        $bill_obj[$key]="'$value'";
    }
}
echo $bill_sql="insert into res_bill (".implode(',',array_keys($bill_obj)).")values(".implode(',',$bill_obj).")";
$opt->query($bill_sql);
$k=0;
for($i=0;$i<(count($_POST)-1)/2;){
    $bill_item_obj=null;
    $bill_item_obj['bill_id']=$bill_obj['id'];

    if(array_key_exists("item".$k,$_POST)){
        $bill_item_obj['item_id']=$_POST['item'.$k];
        $bill_item_obj['count']=$_POST['num'.$k];
        foreach($bill_item_obj as $key=>$value){
            echo $key,'=',$value;
        }
        echo $bill_item_sql="insert into res_bill_item (".implode(',',array_keys($bill_item_obj)).")values(".implode(',',$bill_item_obj).")";
        $opt->query($bill_item_sql);
        $k++;
        $i++;
    }else{
        $k++;
    }
    if($k>50)break;
}



?>
</body>
</html>