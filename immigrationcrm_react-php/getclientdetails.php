<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';

$sql = "SELECT `ID`,`First_name`,`Middle_name`,`Surname`,`Email`,`Enroll_date`,`Contact_num`,`Appln_status`,`Case_notes`,`Visa_type`,`Agr_form_status` FROM `Client`WHERE `ID`='$_GET[id]'";
$result=mysqli_query($conn,$sql);

while($r=mysqli_fetch_assoc($result)){
	$rows=$r;	
}
echo json_encode($rows);

?>