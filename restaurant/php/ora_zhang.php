<?php
/**
 * Created by PhpStorm.
 * User: zq
 * Date: 2015/12/24
 * Time: 16:27
 */
class DB_z{
public $conn;
    function __construct(){

        $this->conn=oci_connect('admin', 'admin','db1', 'utf8');
    }
    function returnmax($tableame,$column){
        $sql="select max(".$column.") from ".$tableame;
        $stmt=oci_parse($this->conn,$sql);
        oci_define_by_name($stmt, 'MAX('.$column.')', $max);
        oci_execute($stmt);
        oci_fetch($stmt);
        oci_free_statement($stmt);
        return $max;
    }
//    function insert(){
//
//    }
}
//返回最大值

