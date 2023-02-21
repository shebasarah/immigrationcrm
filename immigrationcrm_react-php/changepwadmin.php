<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';

$data=json_decode(file_get_contents("php://input"));
$ID=trim($data->ID);
$id=trim($data->id);
$oldusername=trim($data->oldusername);
$newusername=trim($data->newusername);
$oldpassword=trim($data->oldpassword);
$newpassword=trim($data->newpassword);
//$retypenewpassword=trim($data->retypenewpassword);
if($ID==$id){
    $sql = "SELECT `Username`,`Password`,`Salt` FROM `Advisor`WHERE `ID`='$data->id'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
	$u=$row[0];
	$p=$row[1];
	$s=$row[2];
	$oldsaltedpassword=$s.$oldpassword;
	if(($oldusername==$u)&&password_verify($oldsaltedpassword,$p)){
		//if($newpassword==$retypenewpassword){
			$saltednewpassword=$s.$newpassword;
			$newpassword_hash=password_hash($saltednewpassword, PASSWORD_BCRYPT);
			$query="UPDATE `Advisor` SET `Username`='$newusername',`Password`='$newpassword_hash' WHERE `ID`='$ID'";
			if(mysqli_query($conn,$query)){
	
	         $Message="Valid";}
            else{
	         //echo "Error: ". mysqli_error($conn);
	         $Message="Invalid";
            }
            $response=array("status"=>$Message);
            echo json_encode($response);
	//}
	}
	else{
		$Message="Invalid";
	    $response=array("status"=>$Message);
        echo json_encode($response);

	}	
	
}
else{
	$Message="Invalid";
	$response=array("status"=>$Message);
    echo json_encode($response);

}

mysqli_close($conn);

?>