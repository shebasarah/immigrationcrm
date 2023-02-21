<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';


$data=json_decode(file_get_contents("php://input"));
//print_r($data);
$First_name=trim($data->First_name);
$Middle_name=trim($data->Middle_name);
$Surname=trim($data->Surname);
$Visa_type=trim($data->Visa_type);
$Email=trim($data->Email);
$Contact_num=trim($data->Contact_num);
$Case_notes=trim($data->Case_notes);
$Appln_status=trim($data->Appln_status);
$Agr_form_status=trim($data->Agr_form_status);

$query="UPDATE `Client` SET `First_name`='$First_name',`Middle_name`='$Middle_name',`Surname`='$Surname',`Visa_type`='$Visa_type',`Email`='$Email',`Contact_num`='$Contact_num',`Case_notes`='$Case_notes',`Appln_status`='$Appln_status',`Agr_form_status`='$Agr_form_status' WHERE `ID`='$data->ID'";
if(mysqli_query($conn,$query)){
	
	$Message="Valid";
}
else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
}
$response=array("status"=>$Message);
echo json_encode($response);

mysqli_close($conn);


?>