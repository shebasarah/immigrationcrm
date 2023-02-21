<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));
//print_r($data->ID);
$sql="UPDATE `Agreement` SET `Agr_file_name`='NULL' WHERE `ID`='$data->ID'";

$sql1="UPDATE `Client` SET `Agr_form_status`='Upload Pending' WHERE `ID`='$data->ID'";
$rs=mysqli_query($conn,$sql);
$rs1=mysqli_query($conn,$sql1);
if($rs&&$rs1){
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