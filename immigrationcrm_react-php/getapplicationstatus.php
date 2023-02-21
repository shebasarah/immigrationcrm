<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
//$data=json_decode(file_get_contents("php://input"));

$sql = "SELECT `ID`,`First_name`,`Middle_name`,`Surname`,`Appln_status` FROM `Client`WHERE `ID`='$_GET[id]'";
$result=mysqli_query($conn,$sql);

while($r=mysqli_fetch_assoc($result)){
	$rows=$r;	
}
echo json_encode($rows);

?>