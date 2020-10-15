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

    function getProduct($store_id, $con) {
        $sql = "SELECT COUNT(*) FROM Product where store_id = '$store_id'";
        $result = mysqli_query($con, $sql);
        $output = mysqli_fetch_row($result);
        echo $output[0];
        // $sql = "SELECT * FROM Product WHERE store_id = '$store_id'";
        // $result = mysqli_query($con, $sql);
    }
   
    $sql = "SELECT * FROM Product WHERE owner_id = '$userid'";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Query failed";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else if (mysqli_num_rows($result) == 1) { 
            $output = mysqli_fetch_row($result);
            $store_id = $output[0];
            getProduct($store_id, $con);
        } else {
            $resp = "Query failed";
            $status2 = new Status(503, "Multiple stores");
            $response2 = new Response($resp, $status2);
        }
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>