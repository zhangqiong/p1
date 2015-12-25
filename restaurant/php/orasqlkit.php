<?php
/**
 * Created by PhpStorm.
 * User: WuCongyou
 * Date: 2015/12/11
 * Time: 11:30
 */

class SQL_Create_Kit{
public $ope;

    //初始化数据库信息
    function __construct()
    {
        //初始化oracle
    }

    //构造UPDATE语句
    //输入项：表名  关联数组：键值是列名 ，值是列数据  where子句之后的数据
    function create_update($tablename, $array, $where)
    {
        $sql = '';
        //遍历关联数组
        foreach($array as $k=>$v)
        {
            $sql .= ", $k=$v";
        }
        //去除sql的第一位字符（,）
        $sql = substr($sql, 1);
        $sql = "UPDATE $tablename SET $sql WHERE $where";
        return $sql;
    }

    function create_role_string(){
        //生成角色权限字符串
        $rl = $_POST['role'];
        $rc='0000';

        foreach($rl as  $k) {
            if($k=='admin'){
                $rc[0]='1';
            }
            else   if($k=='purchaser'){
                $rc[1]='1';
            }
            else   if($k=='returner'){
                $rc[2]='1';
            }
            else   if($k=='outer'){
                $rc[3]='1';
            }
        }
        return $rc;
    }
    //生成角色权限正则表达式
    function create_role_rgx(){
        $rl = $_POST['role'];
        $rc='0000';

        foreach($rl as  $k) {
            if($k=='admin'){
                $rc[0]='1';
            }
            else   if($k=='purchaser'){
                $rc[1]='1';
            }
            else   if($k=='returner'){
                $rc[2]='1';
            }
            else   if($k=='outer'){
                $rc[3]='1';
            }
        }
//生成正则表达式
        $rgx='';
        for($i=0;$i<4;$i++){
            if($rc[$i]=='0'){
                $rgx.='[01]';
            }
            else if($rc[$i]=='1'){
                $rgx.='1';
            }
        }
        return $rgx;
    }
//初始化select语句关联数组
    function create_default_select_array($ad="ASC"){
        $array=array();
        $array['opt'] ='SELECT';
        $array['cname']='';
        $array['opt2'] ='FROM';
        $array['tablenae']="";
        $array['opt3']='WHERE';
        $array['where']="";
        $array['opt4']='ORDER BY';
        $array['orderby']='';
        $array['opt5']="$ad";//默认升序
        return $array;
    }

    //生成select语句,多条件
//输入：checkbox数组 表名  排序依据列 选择的列名字符串(默认全部) 排序顺序（默认升序）
//返回：多条件的select语句，展示的列为默认为*，通过传入参数来特化
    function create_select_sql($st,$tablename,$orderby,$cname="*",$ad="ASC")
    {

        $tbc=array();
//遍历表单，生成选择项目的关联数组
        foreach($st as  $k) {
            $tbc[$k]=$_POST[$k];
        }
//构造where条件
        $where ='';
        foreach($tbc as $k=>$v)
        {
            $where .= " and $k=$v";
        }
//去除where的前4位字符（ and）
        $where = substr($where, 4);

        $key= $_POST["selected_item"];
//初始化表名
        $sql='';
        $tablename='sell_log';

//初始化select语句关联数组
        $array=$this->create_default_select_array();

//补全关联数组条件
        $array['cname']="$cname";//列名
        $array['tablenae']="$tablename";//表名
        $array['orderby']="$orderby";//排序条件
        $array['where']="$where";
        $array['opt5']="$ad";//默认升序
        $sql=implode(" ", $array);
        return $sql;
    }

    //函数：构造select语句
    function create_select_sql_sp($st,$tablename,$orderby,$isingle,$isall,$cname="*",$ad="ASC"){

        $tbc=array();
//遍历表单，生成选择项目的关联数组

//构造where条件
        $where ='';
if($isingle=='1'){
    if($isall=='1'){
        $where="1=1";
    }
    else{
        $k= $st;
        //权限
        if($k=='role'){
            $rgx=$this->create_role_rgx();
            $where.=" regexp_like(role,'$rgx')";
        }

        else{
            $v= $_POST[$k];
            $where = " $k=$v";
        }
    }

}
//多条件
else if($isingle=='0'){

    foreach($st as  $k) {
        $tbc[$k]=$_POST[$k];
    }
           foreach($tbc as $k=>$v)
           {
               //特殊情况,单个
               //权限
               if($k=='role'){
                   $rgx=$this->create_role_rgx();
                   $where.=" and "."regexp_like(role,'$rgx')";
               }
               //一般情况
               else {
                   $where .= " and $k=$v";
               }
           }
//去除where的前4位字符（ and）
           $where = substr($where, 4);
       }


//初始化select语句关联数组
        $array=$this->create_default_select_array();

//补全关联数组条件
        $array['cname']="$cname";//列名
        $array['tablenae']="$tablename";//表名
        $array['orderby']="$orderby";//排序条件
        $array['where']="$where";
        $array['opt5']="$ad";//默认升序
        $sql=implode(" ", $array);
        return $sql;
    }

    //函数：构造select语句 ，用已经构造好的条件数组
    function create_select_sql_tbc($tbc,$tablename,$orderby,$cname="*",$ad="ASC")
    {

//构造where条件
        $where ='';
        if($tbc==null){
            echo "条件数组为空，终止";
            exit(0);
        }
        foreach($tbc as $k=>$v)
            {
                    $where .= " and $k$v";
            }
//去除where的前4位字符（ and）
            $where = substr($where, 4);

//初始化select语句关联数组
        $array=$this->create_default_select_array();

//补全关联数组条件
        $array['cname']="$cname";//列名
        $array['tablenae']="$tablename";//表名
        $array['orderby']="$orderby";//排序条件
        $array['where']="$where";
        $array['opt5']="$ad";//默认升序
        $sql=implode(" ", $array);
        return $sql;
    }

}