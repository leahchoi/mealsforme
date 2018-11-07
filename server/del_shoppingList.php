<?php
/**
 * Created by IntelliJ IDEA.
 * User: pujasudip
 * Date: 10/15/18
 * Time: 11:58 PM
 */
header("Access-Control-Allow-Origin: *");

require_once('testConnectLocal.php');

$output = [
    'success'=>false
];

$user_id = $_POST['user_id'];
$recipe_id = $_POST['recipe_id'];
$item = $_POST['item'];

$query = "DELETE FROM shoppinglist WHERE `user_id`=$user_id AND `recipe_id`=$recipe_id AND `items`='$item'";

$result = mysqli_query($conn, $query);
if(mysqli_affected_rows($conn)>0) {
    $output['success'] = true;
}

$output = json_encode($output);

print($query);

?>