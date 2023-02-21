<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));
//$location=$data->File_location;
$filename=$data->File_name;
$doctype=$data->Doctype;
if($doctype=="Edu_cert"){
	$query="UPDATE `Client_docs` SET `Edu_cert`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="Exp_cert"){
	$query="UPDATE `Client_docs` SET `Exp_cert`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="CV"){
	$query="UPDATE `Client_docs` SET `CV`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="Cover_letter"){
	$query="UPDATE `Client_docs` SET `Cover_letter`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="SOP"){
	$query="UPDATE `Client_docs` SET `SOP`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="Passport"){
	$query="UPDATE `Client_docs` SET `Passport`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="ID_proof"){
	$query="UPDATE `Client_docs` SET `ID_proof`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="PCC"){
	$query="UPDATE `Client_docs` SET `PCC`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="Partnership_proof"){
	$query="UPDATE `Client_docs` SET `Partnership_proofdoc`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="Children_doc"){
	$query="UPDATE `Client_docs` SET `Children_doc`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="Emed_receipt"){
	$query="UPDATE `Client_docs` SET `Emed_receipt`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
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
	if($doctype=="finish"){
		
		$Partnership_status=$data->Partnership_status;
		$Children_num=trim($data->Children_num);

	//print_r($Partnership_status);
	//	print_r($Children_num);
	$query="UPDATE `Client_docs` SET `Partnership_status`='$Partnership_status',`Children_num`=$Children_num WHERE `ID`='$data->ID'";
	//print_r($query);
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
	}
	else
	if($doctype=="Signedagrfile"){
	$query="UPDATE `Agreement` SET `Agr_file_name`='$filename' WHERE `ID`='$data->ID'";
	if($filename!=null){
		if(mysqli_query($conn,$query))
    	{$query1="UPDATE `Client` SET `Agr_form_status`='Signed' WHERE `ID`='$data->ID'";
            mysqli_query($conn,$query1);
    		$Message="Valid";

	    }
	else{
	echo "Error: ". mysqli_error($conn);
	$Message="Invalid";
        }
        $response=array("status"=>$Message);
        echo json_encode($response);
	}}



//print_r($data);
/*
$query1="UPDATE `Agreement` SET `Edu_cert`='$filename' WHERE `ID`='$data->ID'";
if($location!=null){

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
*/

?>