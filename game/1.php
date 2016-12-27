<?php
$score=$_GET["score"];
$db=new mysqli("localhost","root","","数据库名");
$db->query("set names utf8");
$sql="insert into 表名  (score) values ('{$score}')";
$db->query($sql);
if($db->affected_rows>0){
    echo "<script>alert(1);location.href='game.html'</script>";
}
obj=[
{name:"zhangsan",age:10};
{name:"yu",age:22};
{name:"zhangsan",age:10};
]
?>