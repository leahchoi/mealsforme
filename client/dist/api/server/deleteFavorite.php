<?php

header("Access-Control-Allow-Origin: *");

if(empty($_POST['user_id'])){
    die('No User ID');
}
if(empty($_POST['recipe_id'])){
    die('No Recipe ID');
}

require_once('mysqlProcedural.php');

if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}

$user_id = $_POST['user_id'];
$recipe_id = $_POST['recipe_id'];

$query = "DELETE FROM `favorites` WHERE `user_id` = $user_id AND `recipe_id` = $recipe_id";

if (mysqli_query($conn, $query)){
    echo 'favorite entry deleted successfully';
} else{
    echo 'error deleting favorites: ' . mysqli_error($conn);
}
?>