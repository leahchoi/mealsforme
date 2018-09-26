<?php

require_once('mysql_connect.php');

$recipeDelete = "
DELETE FROM `recipes` 
WHERE (`Instructions` = '[]' OR `Image` = '' OR `Ingredients` = '[]')";

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


if (mysqli_query($conn, $recipeDelete)) {
    echo "Recipe deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}

mysqli_close($conn);

?>