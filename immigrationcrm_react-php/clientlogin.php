<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");

//header("Access-Control-Allow-Headers: access");

	
require 'config.php';

$data=json_decode(file_get_contents("php://input"));

// get the post records
$un= trim($data->username);
$pw= trim($data->password);
//$validpw="";
$sql = "SELECT * from `Client_login` where `Username`='$un'AND `ID`='$data->id'";
//$salt="tempsalt";
$rs=mysqli_query($conn,$sql);
$row=mysqli_fetch_array($rs,MYSQLI_ASSOC);
$password_hash=$row["Password"];
$username=$row["Username"];
$salt=$row["Salt"];
$saltedpw=$salt.$pw;
if(($un==$username)&&password_verify($saltedpw, $password_hash)){
    
    //echo "Success!!!";
    //$Message="Valid";  
    $response=array("status"=>"Valid");
    echo json_encode($response);
 
}


else{
echo mysqli_error($conn);
//$Message="Invalid";
$response=array("status"=>"Invalid");
echo json_encode($response);
}

mysqli_close($conn);
?>