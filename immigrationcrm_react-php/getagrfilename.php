<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));

$sql = "SELECT `Agr_file_name` FROM `Agreement` WHERE `ID`='$data->id'";

$rs=mysqli_query($conn,$sql);

$row=mysqli_fetch_array($rs,MYSQLI_ASSOC);

$filename=$row['Agr_file_name'];
//print_r($filename);
$response=array("Agr_file_name"=>$filename);

echo json_encode($response);
?>