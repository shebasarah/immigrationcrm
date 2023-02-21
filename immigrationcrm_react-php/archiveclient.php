<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: DELETE,PUT,POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
require 'vendor/autoload.php';
use Aws\S3\S3Client;
$data=json_decode(file_get_contents("php://input"));
//print_r($data);
//print_r($data->ID);

$query6="SELECT `ID`,`First_name`,`Surname` FROM `Client` WHERE `ID`='$data->ID'";
$r6=mysqli_query($conn,$query6);
while($r=mysqli_fetch_array($r6,MYSQLI_ASSOC)){
	$Rows=$r;	
}
$ID=$Rows['ID'];
$First_name=$Rows['First_name'];
$Surname=$Rows['Surname'];
$prefix=$First_name.$Surname.$ID;
//print_r($prefix);
$sourceBucket = 'immiclientfilesbucket';

$targetBucket = 'immiclientfiles-archives';

$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'us-west-1',
    'credentials' => [
        'key'    => 'AKIASS36Z5P6OUERK6V4',
        'secret' => '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',
    ],
]);
$filearray=array();

try {
    $contents = $s3->listObjects([
        'Bucket' => $sourceBucket,
        'Prefix' =>$prefix,
    ]);
    //echo "The contents of your bucket are: \n";
    foreach ($contents['Contents'] as $content) {
        //echo $content['Key'] . "\n";
        $filearray[]=$content['Key'];
    }
    

} catch (Exception $exception) {
    echo "Failed to list objects in $sourceBucket with error: " . $exception->getMessage();
    exit("Please fix error with listing objects before continuing.");
}



if(sizeof($filearray)>0){
for ($i = 0; $i<(sizeof($filearray)); $i++) {

	$key=$filearray[$i];
	//print_r($key);
	$copysource=$sourceBucket."/".$key;
// Copy an object.
	try{
$result=$s3->copyObject([
        'Bucket'     => $targetBucket,
        'Key'        => "{$key}",
        'CopySource' => "{$sourceBucket}/{$key}",
]);

}catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}
}}
else{
	$Message="No file found";
}
/*
///delete file
try {
    //Create a S3Client
    $s3Client = new S3Client([
        'region' => 'us-west-1',
        'version' => 'latest',
        'credentials' => [
        'key'    => 'AKIASS36Z5P6OUERK6V4',
        'secret' => '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',
    ],
    ]);
if(sizeof($filearray)>0){
foreach($filearray as $file){
    $result = $s3Client->deleteObject([
        'Bucket' => $sourceBucket,
        'Key' => $file,
    ]);}
print_r($result);
    
}else{
	$Message="No file found";
}
 }catch (S3Exception $e) {
    echo $e->getMessage() . "\n";
}
print_r($Message);
*/
/*
$key="ShebaSunny631bbf28eaf44_AgreementForm.pdf";ShebaSunny631bbf28eaf44_AgreementForm.pdf
$copysource=$sourceBucket."/".$key;
$s3->copyObject([
        'Bucket'     => $targetBucket,
        'Key'        => $key,
        'CopySource' => $copysource,
]);
*/
/////////////////////

$query1= "INSERT INTO `Archive` (`ID`,`First_name`,`Middle_name`,`Surname`,`Email`,`Enroll_date`,`Contact_num`,`Case_notes`,`Visa_type`) SELECT `ID`,`First_name`,`Middle_name`,`Surname`,`Email`,`Enroll_date`,`Contact_num`,`Case_notes`,`Visa_type` FROM `Client` WHERE `ID`='$data->ID'";
$r1=mysqli_query($conn,$query1);
$query2= "SELECT `Edu_cert`,`Exp_cert`,`CV`,`Cover_letter`,`SOP`,`Passport`,`ID_proof`,`PCC`,`Emed_receipt`,`Partnership_status`,`Partnership_proofdoc`,`Children_num`,`Children_doc` FROM `Client_docs` WHERE `ID`='$data->ID'";
//$query2="SELECT `Edu_cert`,'Exp_cert' FROM `Client_docs` WHERE `ID`='$data->ID'";
$r2=mysqli_query($conn,$query2);
//$rows=mysqli_fetch_array($r2,MYSQLI_ASSOC);
while($r=mysqli_fetch_array($r2,MYSQLI_ASSOC)){
	$rows=$r;	
}
$Edu_cert=$rows['Edu_cert']; $Exp_cert=$rows['Exp_cert']; $CV=$rows['CV']; $Cover_letter=$rows['Cover_letter'];
$SOP=$rows['SOP']; $Passport=$rows['Passport']; $ID_proof=$rows['ID_proof']; $PCC=$rows['PCC']; $Emed_receipt=$rows['Emed_receipt']; $Partnership_status=$rows['Partnership_status']; $Partnership_proofdoc=$rows['Partnership_proofdoc']; $Children_num=$rows['Children_num']; $Children_doc=$rows['Children_doc'];
//print_r($rows);
//print_r($Edu_cert);
//print_r($Exp_cert);
$query3= "UPDATE `Archive` SET `Edu_cert`='$Edu_cert',`Exp_cert`='$Exp_cert',`CV`='$CV',`Cover_letter`='$Cover_letter',`SOP`='$SOP',`Passport`='$Passport',`ID_proof`='$ID_proof',`PCC`='$PCC',`Emed_receipt`='$Emed_receipt',`Partnership_status`='$Partnership_status',`Partnership_proofdoc`= '$Partnership_proofdoc', `Children_num` = '$Children_num',`Children_doc`='$Children_doc' WHERE `ID`='$data->ID'";
$r3=mysqli_query($conn,$query3);
$query4="SELECT `Agr_file_name`,`Invoice1`,`Invoice2`,`Receipt1`,`Receipt2` FROM `Agreement` WHERE `ID`='$data->ID'";
$r4=mysqli_query($conn,$query4);
while($r=mysqli_fetch_array($r4,MYSQLI_ASSOC)){
	$rowss=$r;	
}
$Agr_file_name=$rowss['Agr_file_name']; $Invoice1=$rowss['Invoice1']; $Invoice2=$rowss['Invoice2']; $Receipt1=$rowss['Receipt1']; $Receipt2=$rowss['Receipt2'];
$query5= "UPDATE `Archive` SET  `Agr_file_name`='$Agr_file_name',`Invoice1`='$Invoice1',`Invoice2`='$Invoice2',`Receipt1`='$Receipt1',`Receipt2`='$Receipt2' WHERE `ID`='$data->ID'";
$r5=mysqli_query($conn,$query5);



$sql = "DELETE FROM `Client` WHERE `ID`='$data->ID'";
$sql1 = "DELETE FROM `Client_docs` WHERE `ID`='$data->ID'";
$sql2 = "DELETE FROM `Agreement` WHERE `ID`='$data->ID'";
$sql3 = "DELETE FROM `Client_login` WHERE `ID`='$data->ID'";
$rs=mysqli_query($conn,$sql);
$rs1=mysqli_query($conn,$sql1);
$rs2=mysqli_query($conn,$sql2);
$rs3=mysqli_query($conn,$sql3);


mysqli_close($conn);

?>