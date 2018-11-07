<?php
/**
 * Created by IntelliJ IDEA.
 * User: pujasudip
 * Date: 10/16/18
 * Time: 1:00 PM
 */

header("Access-Control-Allow-Origin: *");

require_once('testConnectLocal.php');

$status = $_POST['status'];
$id = $_POST['shop_id'];

$output = [
    'success'=>false
];

$query = "UPDATE `shoppinglist` SET `status`='$status' WHERE `id`=$id";

$result = mysqli_query($conn, $query);

if(mysqli_affected_rows($conn)>0) {
    $output['success'] = true;
}

$output = json_encode($output);

print($output);

?>