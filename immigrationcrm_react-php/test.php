<?php
require 'config.php';
/*$conn=mysqli_connect("localhost","root","","immigrationCRM");
if(!$conn){
  die("Connection Failed");
}
echo "Connected Successfully";
*/
$first_name="a";
$surname="a";
$username=$first_name.$surname;

$email="a@a";
$phone="1234567890";
$case_notes="a";
$application_status="a";
$randompw="1234";
$randomsalt="12abc";
$saltedpw=$randomsalt.$randompw;
//echo("$first_name");

$query="INSERT INTO `Client`(`ID`,`First_name`,`Middle_name`,`Surname`,`Email`,`Username`,`Password`,`Salt`,`Enroll_date`,`Contact_num`,`Case_notes`,`Appln_status`) VALUES (UUID_SHORT(), '$first_name', '$middle_name','$surname','$email','$username', '$saltedpw','$randomsalt', NOW(),'$phone','$case_notes','$application_status')";

//$query="INSERT INTO `Client`(`ID`,`First_name`,`Middle_name`,`Surname`,`Email`,`Username`,`Password`,`Salt`,`Enroll_date`,`Contact_num`,`Case_notes`,`Appln_status`) VALUES (UUID_SHORT(), 'first_name', 'middle_name','surname','email','username', 'saltedpw','randomsalt', NOW(),'1234567890','case_notes','application_status')";


if(mysqli_query($conn,$query)){
	echo "New record has been inserted";
}
else{
	echo "Error: ". mysqli_error($conn);
}

mysqli_close($conn);


?>