<?php
$conn = mysqli_connect('localhost', 'root', 'root', 'final_project', '3306');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>