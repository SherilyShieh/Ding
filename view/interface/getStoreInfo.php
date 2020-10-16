<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $userid = $_GET["userid"];
    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);

    $sql = ""
?>