<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
	
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST"){
$data=json_decode(file_get_contents("php://input"));
//print_r($data);
$first_name=trim($data->first_name);
$middle_name=trim($data->middle_name);
$surname=trim($data->surname);
$username=trim($first_name.$surname);
$email=trim($data->email);
$phone=trim($data->phone);
$case_notes=trim($data->case_notes);
$application_status=trim($data->application_status);
$visatype=$data->visatype;
$agrstatus=$data->agrstatus;

$randompw= mt_rand(1111,9999);
$randomsalt=mt_rand(1111,9999);
$saltedpw=$randomsalt.$randompw;
$password_hash=password_hash($saltedpw, PASSWORD_BCRYPT);
$ID=uniqid();

$query="INSERT INTO `Client`(`ID`,`First_name`,`Middle_name`,`Surname`,`Email`,`Enroll_date`,`Contact_num`,`Case_notes`,`Appln_status`,`Visa_type`,`Agr_form_status`) VALUES ('$ID', '$first_name', '$middle_name','$surname','$email', NOW(),'$phone','$case_notes','$application_status','$visatype','$agrstatus')";
$query1="INSERT INTO `Client_login`(`ID`,`Username`,`Password`,`Salt`) VALUES ('$ID','$username', '$password_hash','$randomsalt')";
$query2="INSERT INTO `Client_docs`(`ID`,`Username`) VALUES ('$ID','$username')";
$query3="INSERT INTO `Agreement`(`ID`,`Username`,`First_name`,`Middle_name`,`Surname`,`Payment_status`,`Agr_file_name`,`Invoice1`,`Invoice2`,`Receipt1`,`Receipt2`) VALUES ('$ID','$username','$first_name','$middle_name','$surname','Payment Pending','NULL','NULL','NULL','NULL','NULL')";

if((mysqli_query($conn,$query))&&(mysqli_query($conn,$query1)))
{
	if((mysqli_query($conn,$query2))&&(mysqli_query($conn,$query3)))
	{
		$Message="Valid";

	}
	else{echo "Error: ". mysqli_error($conn);
		$Message="Invalid";
	}
	
}
else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
}
$response=array("status"=>$Message,"ID"=>$ID,"username"=>$username,"pw"=>$randompw);
echo json_encode($response);
}
mysqli_close($conn);

?>