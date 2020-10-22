<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $storeid = $_GET["storeid"];
    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);

    $sql = "SELECT * FROM store WHERE id = $storeid";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get store's information falied!";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else if (mysqli_num_rows($result) == 1) { 
            $output = mysqli_fetch_row($result);
            $store = new Store($output[0], $output[1], $output[2]);
            $status2 = new Status(200, "Get store's infromation successfully!");
            $response2 = new Response($store, $status2);
        } else {
            $resp = "Multiple stores!";
            $status2 = new Status(503, "Multiple stores!");
            $response2 = new Response($resp, $status2);
        }
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>