<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type:application/json; charset=UTF-8");
require 'config.php';
$data=json_decode(file_get_contents("php://input"));
//print_r($data);
$filename=$data->Key;
//$prefix=$data->First_name.$data->Surname.$data->ID;
//print_r($filename);


//if(is_file($file_name)){
/**** configuration variables to set ****/
// AWS API keys
$aws_access_key_id = 'AKIASS36Z5P6OUERK6V4';
$aws_secret_access_key = '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';

// S3 bucket
$bucket_name = 'immiclientfiles-archives';

// aws region

$aws_region = 'us-west-1';

// path of file in bucket
// example : 'records.json', 'files/test.png'
$file_name_path = $filename;
//print_r($file_name_path);

// downloaded file name
// example : 'records.json', 'files/test.png'
$download_name = 'Downloads'.'/'.$filename;
//print_r($download_name);



/**** other variables that are automatically set ****/
// bucket host name
$host_name = $bucket_name . '.s3.amazonaws.com';

// service name for S3
$aws_service_name = 's3';

// payload
// no payload in this API
$content = '';

// UTC timestamp and date
$timestamp = gmdate('Ymd\THis\Z');
$date = gmdate('Ymd');



/**** Task 1 : create canonical request for aws signature 4 ****/
// HTTP request headers as key & value
$request_headers = array();
$request_headers['Host'] = $host_name;
$request_headers['Date'] = $timestamp;
$request_headers['x-amz-content-sha256'] = hash('sha256', $content);
// sort it in ascending order
ksort($request_headers);

// canonical headers
$canonical_headers = [];
foreach($request_headers as $key => $value) {
	$canonical_headers[] = strtolower($key) . ":" . $value;
}
$canonical_headers = implode("\n", $canonical_headers);

// signed headers
$signed_headers = [];
foreach($request_headers as $key => $value) {
	$signed_headers[] = strtolower($key);
}
$signed_headers = implode(";", $signed_headers);

// cannonical request 
$canonical_request = [];
$canonical_request[] = "GET";
$canonical_request[] = "/" . $file_name_path;
$canonical_request[] = "";
$canonical_request[] = $canonical_headers;
$canonical_request[] = "";
$canonical_request[] = $signed_headers;
$canonical_request[] = hash('sha256', $content);
$canonical_request = implode("\n", $canonical_request);
$hashed_canonical_request = hash('sha256', $canonical_request);



/**** Task 2 : creating a string to sign for aws signature 4 ****/
// AWS scope
$scope = [];
$scope[] = $date;
$scope[] = $aws_region;
$scope[] = $aws_service_name;
$scope[] = "aws4_request";

// string to sign
$string_to_sign = [];
$string_to_sign[] = "AWS4-HMAC-SHA256"; 
$string_to_sign[] = $timestamp; 
$string_to_sign[] = implode('/', $scope);
$string_to_sign[] = $hashed_canonical_request;
$string_to_sign = implode("\n", $string_to_sign);



/**** Task 3 : calculating signature for aws signature 4 ****/
// signing key
$kSecret = 'AWS4' . $aws_secret_access_key;
$kDate = hash_hmac('sha256', $date, $kSecret, true);
$kRegion = hash_hmac('sha256', $aws_region, $kDate, true);
$kService = hash_hmac('sha256', $aws_service_name, $kRegion, true);
$kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);

// signature
$signature = hash_hmac('sha256', $string_to_sign, $kSigning);



/**** Task 4 : Add signature to HTTP request ****/
// authorization
$authorization = [
	'Credential=' . $aws_access_key_id . '/' . implode('/', $scope),
	'SignedHeaders=' . $signed_headers,
	'Signature=' . $signature
];
$authorization = 'AWS4-HMAC-SHA256' . ' ' . implode( ',', $authorization);



/**** send HTTP request ****/
// curl headers
$curl_headers = [ 'Authorization: ' . $authorization ];
foreach($request_headers as $key => $value) {
	$curl_headers[] = $key . ": " . $value;
}

$url = 'https://' . $host_name . '/' . $file_name_path;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $curl_headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
$response = curl_exec($ch);
//print_r($response);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if($http_code != 200) 
	exit('Error : Failed to download file');

$success = file_put_contents($download_name, $response);
if(!$success){
	$message="Error";
	exit('Error : Failed to save file to directory');
}
else{$message="Success";}
$response=array("status"=>$message);
echo json_encode($response);

/*
}
else{ 
	$message="No such file found!";
echo json_encode($message);
}
*/
mysqli_close($conn);


?>