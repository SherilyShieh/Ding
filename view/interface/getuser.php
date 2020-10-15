<?php
    session_start();
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

    $sql = "SELECT * FROM User WHERE id = '$userid'";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Login failed";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else if (mysqli_num_rows($result) == 1) { 
            $output = mysqli_fetch_row($result);
            $loginUser = new User($output[0], $output[1], $output[2], $output[3], $output[5],$output[6]);
            $ssid = base64_encode($output[2]. "/" . time());
            // $expire=time()+60*60*24*7;
            $_SESSION['LOGINSSEIONID'] = $ssid;
            $json_cooike = JSON_STRING_NOECHO($loginUser);
            setcookie("USER_COOIKE", $json_cooike);
            $status2 = new Status(200, "login successfully");
            $response2 = new Response($loginUser, $status2);
        } else {
            $resp = "Login failed";
            $status2 = new Status(503, "login failed");
            $response2 = new Response($resp, $status2);
        }
        JSON_STRING($response2);
        session_destroy();

    }
    mysqli_close($con);
?>