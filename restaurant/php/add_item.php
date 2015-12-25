<meta charset="utf-8">
<?php
/**
 * Created by PhpStorm.
 * User: zq
 * Date: 2015/12/24
 * Time: 16:16
 */
include "ora_zhang.php";
$opt=new DB_z();
$obj=$_POST;
echo "商品id：".$obj['id']=$opt->returnmax('res_item','id')+1;

include 'ora.php';
$opt2=new DB_Oracle();
$sql="insert into res_item (".implode(',',array_keys($obj)).")values('".implode("','",$obj)."')";
$opt2->query($sql);