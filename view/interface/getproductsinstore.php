<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $userid = $_GET["userid"];
    $price_order = $_GET["priceorder"];
    $time_order = $_GET["timeorder"];
    $page = $_GET["page"];

    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);

    function getProduct($store_id, $con, $page, $price_order, $time_order) {
        $sql = "SELECT COUNT(*) FROM Product where store_id = '$store_id'";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Query failed";
            $status = new Status(500, "query error:" . mysqli_error($con));
            return new Response($resp, $status);
        } else {
            $output = mysqli_fetch_row($result);
            $total_count = $output[0];
            if ($total_count > 0) {
                $start=($page-1)*10;
                $end = $page*10;
                $sql = "SELECT * FROM Product WHERE store_id = '$store_id' ORDER BY product_price $price_order, update_time $time_order limit $start, $end";
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    $resp = "Query failed";
                    $status = new Status(500, "query error:" . mysqli_error($con));
                    return new Response($resp, $status);
                } else { 
                    $response = array();
                    $index = 0;
                    while($output = mysqli_fetch_row($result)) {
                        $product = new Product($output[0], $output[1], $output[2], $output[3], $output[4], urldecode($output[5]),urldecode($output[6]), $output[7], $output[8], $output[9], $output[10], $output[11], $output[12]);
                        $response[$index] = $product;
                        $index++;
                    }
                    $list_res = new ListResult($total_count, $response);
                    $status = new Status(200, "query successfully!");
                    return new Response($list_res, $status);
                }
            } else {
                $list_res = new ListResult(0, null);
                $status = new Status(200, "query successfully");
                return new Response($list_res, $status);
            }
        }

    }
   
    $sql = "SELECT * FROM Store WHERE owner_id = '$userid'";
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
            $response2 = getProduct($store_id, $con, $page, $price_order, $time_order);
        } else {
            $resp = "Query failed";
            $status2 = new Status(503, "Multiple stores");
            $response2 = new Response($resp, $status2);
        }
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>