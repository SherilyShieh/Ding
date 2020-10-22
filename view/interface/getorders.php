<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $price_order = $_GET["priceorder"];
    $time_order = $_GET["timeorder"];
    $page = $_GET["page"];
    $start=($page-1)*10;
    $end = $page*10;
    if (isset($_GET["buyerid"])) {
        $sql_count = "SELECT COUNT(*) FROM `Order` where buyer_id = '{$_GET["buyerid"]}' ";
        $sql = "SELECT * FROM `Order` WHERE buyer_id = '{$_GET["buyerid"]}' ORDER BY product_price $price_order, create_time $time_order limit $start, $end";
    }
    if (isset($_GET["salerid"])) {
        $sql_count = "SELECT COUNT(*) FROM `Order` where saler_id = '{$_GET["salerid"]}' ";
        $sql = "SELECT * FROM `Order` WHERE saler_id = '{$_GET["salerid"]}' ORDER BY product_price $price_order, create_time $time_order limit $start, $end";
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
        $result = mysqli_query($con, $sql_count);
        if (!$result) {
            $resp = "Query failed";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else { 
            $output = mysqli_fetch_row($result);
            $total_count = $output[0];
            if ($total_count > 0) {
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    $resp = "Query failed";
                    $status2 = new Status(500, "query error:" . mysqli_error($con));
                    $response2 = new Response($resp, $status2);
                } else {
                    $resp_list = array();
                    while ($output = mysqli_fetch_row($result)) {
                        $order = new Order($output[0], $output[1], $output[2], $output[3], $output[4], $output[5], $output[6], $output[7], $output[8], $output[9], $output[10], $output[11], $output[12], $output[13], $output[14]);
                        array_push($resp_list, $order );
                    }
                    $resp_list = new ListResult($total_count, $resp_list);
                    $status2 = new Status(200, "Query successfully!");
                    $response2 = new Response($resp_list, $status2);
                }
            } else {
                $resp_list = new ListResult(0, null);
                $status2 = new Status(200, "Query successfully!");
                $response2 = new Response($resp_list, $status2);
            }

        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);

?>