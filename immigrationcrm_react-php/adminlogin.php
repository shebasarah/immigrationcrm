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
$sql = "SELECT * from `Advisor` where `Username`='$un'AND `ID`='$data->id'";
$rs=mysqli_query($conn,$sql);
$row=mysqli_fetch_array($rs,MYSQLI_ASSOC);

$p=$row["Password"];
$u=$row["Username"];
$s=$row["Salt"];
$saltedpw=$s.$pw;
$id=$row["ID"];
//echo($u);
//echo($p);
if($un==$u&&password_verify($saltedpw, $p)){
    $response=array("status"=>"Valid");
    echo json_encode($response);
      
}

else{
//echo mysqli_error($conn);
$response=array("status"=>"Invalid");
echo json_encode($response);
}


mysqli_close($conn);

?>