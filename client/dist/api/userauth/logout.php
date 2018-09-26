<?php
if (isset($_POST)){
    session_start();
    session_unset();
    session_destroy();
    print('user has been logged out');
}

?>