<?php
require_once('mysqlProcedural.php');
header("Access-Control-Allow-Origin: *");

if(!$conn){
    die('Bad connection');
}

if(empty($_GET)){
    die('No User ID given');
}

$user_id = $_GET['user_id'];

$query = "
SELECT *
FROM `recipes`
JOIN `favorites` ON `recipes`.`ID` = `favorites`.`recipe_ID`
JOIN `users` ON `favorites`.`user_id` = `users`.`user_id`
WHERE `favorites`.`user_id` = $user_id
";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result)>0){
    $output['data']=[];
    while($row=mysqli_fetch_assoc($result)){
        $output['data'][]=$row;
    }
} else{
    $output['errors'][]='There are no favorites.';
}

$jsonOutput = json_encode($output);
print($jsonOutput);
mysqli_close($conn);
?>