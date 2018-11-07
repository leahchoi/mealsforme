<?php
header("Access-Control-Allow-Origin: *");  

session_start();
if(isset($_POST)){
    include_once 'mysqlconnect.php';
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $userPassword = mysqli_real_escape_string($conn, $_POST['password']);
    $output = [];
    $output['success'] = 'false';


    //check if inputs are empty
    if(empty($username) || empty($userPassword)){
        $output['message'] = 'empty fields.';
        exit();
    }else{
        //create query and query the database with info given to us and does some error checking
        $query = "SELECT * FROM `users` WHERE `user_username`='$username'";
        $result = mysqli_query($conn, $query);
        $queryCheck = mysqli_num_rows($result);
        //check to see if query returned anything
        if($queryCheck < 1){
            $output['message'] = 'username not found';
            exit();
        }else{
            //grabs data returned after the query and stores it into an array
            if($row = mysqli_fetch_assoc($result)){
                $passwordCheck = password_verify($userPassword, $row['user_password']);
                //checking if password check will return a true or false statement , elseif to make sure we got returned a truth value and not some other value
                if($passwordCheck === false){
                    $output['message'] = 'password incorrect.';
                    exit();
                }elseif ($passwordCheck === true){
                    //gonna log in the user , grab the data and from sessions and store that.
                    $_SESSION['user_username']=$row['user_username'];
                    $_SESSION['user_firstname']=$row['user_firstname'];
                    $_SESSION['user_lastname']=$row['user_lastname'];
                    $_SESSION['user_email']=$row['user_email'];
                    $_SESSION['user_id']=$row['user_id'];
                    $output['success']=1;
                    $output['message'] = 'login successful';
                    $output['user_id'] = $row['user_id'];
                    $output['username'] = $username;
                    $output['firstname'] = $_SESSION['user_firstname'];

                    $output = json_encode($output);
                    print($output);
                    exit();

                }
            }
        }
    }
}else{
    header("login=error");
    exit();
}
