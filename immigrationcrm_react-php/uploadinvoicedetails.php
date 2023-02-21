<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));
//$location=$data->File_location;
//print_r($data);
$filename=$data->File_name;
$doctype=$data->Doctype;
if($doctype=="Invoice1"){
	
	$query="UPDATE `Agreement` SET `Invoice1`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=NULL){
		if(mysqli_query($conn,$query))
    	{
    		$Message="Valid";
	    }
	else{
	//echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
    }
    else{$Message="Invalid";
    }
        
	
	$response=array("status"=>$Message);
        echo json_encode($response);
}
else
	if($doctype=="Invoice2"){
	$query="UPDATE `Agreement` SET `Invoice2`='$filename' WHERE `ID`='$data->ID'";
	//print_r($filename);
	
	if($filename!=NULL){
		if(mysqli_query($conn,$query))
    	{
    		$Message="Valid";

	    }
	else{
	//echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
        
	}
	else{
	//echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
	$response=array("status"=>$Message);
        echo json_encode($response);

}


else
	if($doctype=="Receipt1"){
	$query="UPDATE `Agreement` SET `Receipt1`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=NULL){
		if(mysqli_query($conn,$query))
    	{
    		$Message="Valid";

	    }
	else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
        $response=array("status"=>$Message);
        echo json_encode($response);
	}}

else
	if($doctype=="Receipt2"){
	$query="UPDATE `Agreement` SET `Receipt2`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=NULL){
		if(mysqli_query($conn,$query))
    	{
    		$Message="Valid";

	    }
	else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
        $response=array("status"=>$Message);
        echo json_encode($response);
	}}



else{
	if($doctype=="finish"){
		$Payment_status=$data->Payment_status;
		//print_r($Payment_status);
		
	$query="UPDATE `Agreement` SET `Payment_status`='$Payment_status' WHERE `ID`='$data->ID'";
	if($Payment_status!=NULL){
		if(mysqli_query($conn,$query))
    	{
    		$Message="Valid";
	    }
	else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
    }else 
	{echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
}

 $response=array("status"=>$Message);
        echo json_encode($response);
        }

       
	
	}



//print_r($data);


?>