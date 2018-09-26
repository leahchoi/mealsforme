<?php

require_once('mysql_connect.php');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$recIngDelete = "
DELETE `recipe_ingredients` 
FROM `recipe_ingredients` 
LEFT JOIN `recipes` 
ON `recipes`.ID = `recipe_ingredients`.`recipe_ID` 
WHERE `recipes`.ID IS null";

if (mysqli_query($conn, $recIngDelete)) {
    echo "REC ING deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

mysqli_close($conn);

?>

