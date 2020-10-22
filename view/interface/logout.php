<?php
    session_start();
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    if(isset($_COOKIE['LOGINSSEIONID'])){
        unset($_SESSION['LOGINSSEIONID']);
    }
    $_SESSION = array();
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time()-42000, '/'); 
    }
    session_destroy();
    $status = new Status(200, "Logout successfully");
    $response = new Response("Logout successfully", $status);
    JSON_STRING($response);

?>