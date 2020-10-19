<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $storeid = $_GET["storeid"];
    if (isset($_GET["keyword"])) {
        $key = $_GET["keyword"];
        $sql = "SELECT * FROM product WHERE store_id = '$storeid' and (`type` like '%$key%' or department like '%$key%' or product_name like '%$key%')";
    } else {
        $sql = "SELECT * FROM product WHERE store_id = '$storeid' ";
    }

    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);

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
        } else { 
            $response = array();
            $index = 0;
            while($output = mysqli_fetch_row($result)) {
                $product = new Product($output[0], $output[1], $output[2], $output[3], $output[4], urldecode($output[5]),urldecode($output[6]), $output[7], $output[8], $output[9], $output[10], $output[11], $output[12]);
                $response[$index] = $product;
                $index++;
            }
            $status = new Status(200, "query successfully!");
            $response2 =  new Response($response, $status);
        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>