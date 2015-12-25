<?php  
//php操纵oracle类
class DB_Oracle {    
public $conn;     //连接句柄 
 public $debug = 1;    //是否输出调试信息   
 //初始化数据库信息 
 function __construct($debug = 1) 
 {  
  $this->debug = $debug; 
   $this->connect();
   }   
   
 //数据库连接 数据编码自行选择，本例为：UTF8 
 function connect( $dbuser='admin', $dbpwd='admin', $dbname = 'db1', $charset = 'utf8')
 {  
 	$this->conn = oci_connect($dbuser, $dbpwd, $dbname, $charset);
 	
      if (!$this->conn) { 
         $e = oci_error();
         print htmlentities($e['初始化连接出错']);
         exit;
      }
      else
      {
        echo "初始化连接成功".'<br />';
        }
        return $this->conn;
      }
    
     //执行sql语句 
    // 输入项：sql语句
    //返回值：成功：事务  失败：false
    function query($sql)
    {
     $stmt = oci_parse($this->conn, $sql);  
     	  if (!$stmt) { 
 $e = oci_error($this->conn);
 print htmlentities($e['预执行出错']); 
 exit; 
 } 
        $r=oci_execute($stmt,OCI_COMMIT_ON_SUCCESS);//自动提交
      if(!$r) 
      {
          $this->halt('执行SQL语句错误', $sql, $stmt);  
            return false;  
      }
        else{
            echo '<br />'."语句:{$sql}执行成功，受影响行数：";
           echo  $this->affected_rows($stmt);
        }
            return $stmt; 
    }  
              
 //执行SELECT语句 1
// 输入项：sql语句，关键字
//输出项：与关键字相关的关联数组
 function select1($sql, $keyField = '') 
 {  
  $array = array(); //建立空数组
    $stmt = $this->query($sql); 
      while ($row = oci_fetch_array($stmt, OCI_BOTH)) 
      {   
       if(!$keyField) //关键字串为空，返回全部
       {   
         $array[] = $row;   
       } 
          else//关键字串非空，返回与关键字相关条目
           {   
             $array[] = $row[$keyField];  
           }  
      }
     oci_free_statement($stmt);
 return $array; 
}

//查看记录总数
    function count_total($tablename){

        $sql="SELECT * FROM  $tablename";
        $stmt = $this->query($sql);
        $count=$this->total($stmt);
        echo '记录数：'.$count.'<br>';
        return $count+1;
    }


 //执行SELECT语句 ，并且以表格形式打印全部结果集
 function select($sql)
 {  
    $stmt = $this->query($sql); 
    
  // 打印执行结果开始
     $ct=0;
print '<table border="1">';
 while($row = oci_fetch_array($stmt, OCI_ASSOC+OCI_RETURN_NULLS)) {
     $ct++;
 print '<tr>'; //行起始
     print '<td>'.$ct.'</td>';//序号
 foreach($row as $item) { //构造列
 print '<td>'.($item?htmlentities($item):'空值').'</td>'; 
 }
     print '</tr>';

 } 
 print '</table>'; 
//打印结束
     echo '<br />'.$ct. " rows selected.<br />";
     oci_free_statement($stmt);
}
    //从事务中生成结果集并且打印，并且以带表头的表格形式打印
    //输入项：事务，表头
    function prtResult($stmt,$array){

        // 打印执行结果开始
        $ct=0;
        print '<table border="1">';
        print '<tr>'; //行起始
        foreach($array as $k){
            print '<td>'.$k.'</td>';//序号
        }
        print '</tr>';
        while($row = oci_fetch_array($stmt, OCI_ASSOC+OCI_RETURN_NULLS)) {
            $ct++;
            print '<tr>'; //行起始
            print '<td>'.$ct.'</td>';//序号
            foreach($row as $item) { //构造列
                print '<td>'.($item?htmlentities($item):'空值').'</td>';
            }
            print '</tr>';

        }
        print '</table>';
//打印结束
        echo '<br />'.$ct. " rows selected.<br />";
        oci_free_statement($stmt);
    }

 //执行INSERT语句  
 //输入项：表名  关联数组：键值是列名 ，值是列数据
 function insert($tablename, $array) 
 {
    // $sql="INSERT INTO $tablename (".implode(',', array_keys($array)).") VALUES(".implode(',', $array).")";
     $sql="INSERT INTO $tablename (".implode(',', array_keys($array)).") VALUES('".implode("','", $array)."')";
     $this->query($sql);
 //return $this->insert_id();  
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

    //执行UPDATE语句
  //输入项：表名  关联数组：键值是列名 ，值是列数据  where子句之后的数据
 function update($tablename, $array, $where) 
 {  
 	 $sql = $this->create_update($tablename, $array, $where) ;
          return $this->query($sql); 
 }   
 
 //执行SELECT语句
 //返回值：结果集数组 
  function get_one($sql)
   {  
    $stmt = $this->query($sql); 
      $rs = oci_fetch_array($stmt, OCI_BOTH);
       oci_free_statement($stmt);
        return $rs; 
   }   
        
 //执行SELECT语句获取记录数 
 //
 function total1($sql, $filed = "count")
 {  
  $totalItems = $this->get_one($sql); 
  //返回键值为$filed的关联数组项的值
    return $totalItems[$filed];

     }

    //执行SELECT语句获取记录数
    //
    function total($stmt)
    {
        // 打印执行结果开始
        $ct=0;
        while($row = oci_fetch_array($stmt, OCI_ASSOC+OCI_RETURN_NULLS)) {
            $ct++;
            foreach($row as $item) { //构造列

            }
        }
//打印结束
        echo '<br />'.$ct. " rows selected.<br />";
        oci_free_statement($stmt);
return $ct;
    }
    //获取刚插入记录ID
  function insert_id() 
 {  
  //return mysql_insert_id($this->conn); 
  }   
  
 //获取上一语句的影响记录数 
  function affected_rows($stmt) 
  {  
   return oci_num_rows($stmt); 
    }  

 //输出数据库错误 
 function halt($message = '', $sql = '', $stmt) 
 {  
 	 $errormsg = "<b>Oracle Query : </b><font style='font-size:14px;color:#FF0000;'>$sql</font> <br /><b> Oracle Error : </b>".$this->error($stmt)." <br /><b> Message : </b> $message";
 	   if($this->debug) 
 	   {   
 	   	 echo '<div style="font-size:12px;text-align:left; border:1px solid #9cc9e0; padding:1px 4px;color:#000000;font-family:Arial, Helvetica,sans-serif;"><span>'.$errormsg.'</span></div>';   
 	 	 exit;  
 	 	  } 
 }   
 
 //获取数据库错误信息  
 function error($stmt)
{  
 	$e = @oci_error($stmt); 
   return $e['message'];  
}     
}




