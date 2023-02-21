<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';

$sql = "SELECT `ID`,`First_name`,`Middle_name`,`Surname`,`Payment_status`,`Invoice1`,`Invoice2`,`Receipt1`,`Receipt2` FROM `Agreement`";

$rs=mysqli_query($conn,$sql);
$rows=array();
while($r=mysqli_fetch_assoc($rs)){
	$rows[]=$r;	
}

echo json_encode(['records'=>$rows]);
?>