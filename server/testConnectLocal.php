<?php

$conn = new mysqli(
    'localhost',
    'root',
    'root',
    'final_project',
    '3306');

if ($conn->connect_error) {
    die('Connect Error: ' . $conn->connect_error);
}

?>