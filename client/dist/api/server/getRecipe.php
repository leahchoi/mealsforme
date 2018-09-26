<?php

header("Access-Control-Allow-Origin: *");

require_once('mysql_server_connect.php');

if(!$conn){
   die('Bad connection');
}

if(empty($_GET)){
   die('No recipe ID');
}


$id = $_GET['id'];

$query = "SELECT * FROM `recipes` WHERE `recipes`.`ID` = $id";

$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0 ) {
   $output['data']=[];
   while( $row = mysqli_fetch_assoc($result) ){
       $output['data'][] = $row;
   }
} else {
   $output['errors'][] = 'Invalid Search ID. No data.';
}

$jsonOutput = json_encode($output);
print_r($jsonOutput);
mysqli_close($conn);

?>