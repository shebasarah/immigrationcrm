<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));
$sql = "DELETE FROM `Client` WHERE `ID`='$data->ID'";
$sql1 = "DELETE FROM `Client_docs` WHERE `ID`='$data->ID'";
$sql2 = "DELETE FROM `Agreement` WHERE `ID`='$data->ID'";
$sql3 = "DELETE FROM `Client_login` WHERE `ID`='$data->ID'";
$rs=mysqli_query($conn,$sql);
$rs1=mysqli_query($conn,$sql1);
$rs2=mysqli_query($conn,$sql2);
$rs3=mysqli_query($conn,$sql3);
mysqli_close($conn);

?>