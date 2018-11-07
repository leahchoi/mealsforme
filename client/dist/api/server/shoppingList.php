<?php
/**
 * Created by IntelliJ IDEA.
 * User: pujasudip
 * Date: 10/15/18
 * Time: 11:35 AM
 */
header("Access-Control-Allow-Origin: *");

require_once('testConnectLocal.php');

$output = [
    'success'=>false
];

if($_GET){
    $id = $_GET['id'];
    $queryGet = "SELECT * FROM shoppinglist WHERE `user_id`=$id";

    $result = mysqli_query($conn, $queryGet);

    if(mysqli_num_rows($result)>0){
        while($row = mysqli_fetch_assoc($result)){
            $output['success'] = true;
            $output['data'][] = $row;
        }
    }

    $output = json_encode($output);

    print($output);
    exit();
}

if($_POST){
    $user_id = $_POST['user_id'];
    $recipe_id = $_POST['recipe_id'];
    $item = $_POST['item'];
    $qty = $_POST['qty'];
    $status = 'incomplete';

    $queryGet = "SELECT * FROM shoppinglist WHERE `user_id`=$user_id AND `recipe_id`=$recipe_id AND `items`='$item'";

    $result = mysqli_query($conn, $queryGet);

    if(mysqli_num_rows($result)>0){
        $output['success'] = false;
        $output['mesage'] = 'item already exits in the list';
        $output = json_encode($output);
        print($output);
        exit();
    }

    $queryInsert = "REPLACE INTO `shoppinglist` (`id`, `user_id`, `recipe_id`, `items`, `quantity`,`status`) VALUES (NULL, '$user_id', '$recipe_id', '$item', '$qty', '$status')";

    $result = mysqli_query($conn, $queryInsert);
    if(mysqli_affected_rows($conn)>0) {
        $output['success'] = true;
    }

    $output = json_encode($output);

    print($output);
}
?>