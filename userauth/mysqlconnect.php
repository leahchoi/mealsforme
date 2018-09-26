<?php
$conn = mysqli_connect('joshsohn.co', 'food', 'foodgroup1', 'what_to_food', '3306');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>