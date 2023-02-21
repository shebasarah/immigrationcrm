<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));
//$location=$data->File_location;
$filename=$data->File_name;
print_r($location);
$query="UPDATE `Client` SET `Agr_form_status`='Uploaded' WHERE `ID`='$data->ID'";
$query1="UPDATE `Agreement` SET `Agr_file_name`='$filename' WHERE `ID`='$data->ID'";
if($filename!=null){

    if((mysqli_query($conn,$query))&&(mysqli_query($conn,$query1)))
    	{
    		$Message="Valid";

	    }
	else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }	
}
else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
}
$response=array("status"=>$Message);
echo json_encode($response);

mysqli_close($conn);


?>