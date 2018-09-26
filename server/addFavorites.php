<?php
if(empty($_POST)){
    echo 'invalid post';
}

require_once('mysql_server_connect.php');

header("Access-Control-Allow-Origin: *");

$user_id = $_POST['user_id'];
$recipe_id = $_POST['recipe_id'];

if($conn->connect_errno){
    die('Bad connection');
}

$query = "
REPLACE INTO `favorites`(`ID`, `recipe_id`, `user_id`) 
VALUES (null,$recipe_id, $user_id)";


if($result = $conn->query($query)){
    echo 'insert successful';
} else{
    print('duplicate entry');
}
$conn->close();



?>