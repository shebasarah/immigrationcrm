<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';

$data=json_decode(file_get_contents("php://input"));
//print_r($data);
$ID=trim($data->ID);
$id=trim($data->id);
$oldusername=trim($data->oldusername);
$newusername=trim($data->newusername);
$oldpassword=trim($data->oldpassword);
$newpassword=trim($data->newpassword);
//$retypenewpassword=trim($data->retypenewpassword);
if($ID==$id){
    $sql = "SELECT `Username`,`Password`,`Salt` FROM `Client_login`WHERE `ID`='$data->id'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
	$u=$row[0];
	$p=$row[1];
	$s=$row[2];
	$oldsaltedpassword=$s.$oldpassword;
	if(($oldusername==$u)&&password_verify($oldsaltedpassword,$p)){
		
		
			$saltednewpassword=$s.$newpassword;
			$newpassword_hash=password_hash($saltednewpassword, PASSWORD_BCRYPT);
			$query="UPDATE `Client_login` SET `Username`='$newusername',`Password`='$newpassword_hash' WHERE `ID`='$ID'";
			$query1="UPDATE `Client_docs` SET `Username`='$newusername'WHERE `ID`='$ID'";
			$query2="UPDATE `Agreement` SET `Username`='$newusername'WHERE `ID`='$ID'";
			if(mysqli_query($conn,$query)){
				mysqli_query($conn,$query1);
	
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