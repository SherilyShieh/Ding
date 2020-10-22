<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";


    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);


    $user_id = $_GET["user_id"];
    $page = $_GET["page"];
    $price_order = $_GET["priceorder"];
    $time_order = $_GET["timeorder"];
    $start=($page-1)*10;
    $end = $page*10;

    $sql = "SELECT COUNT(*) FROM product WHERE collections like '%$user_id%' ORDER BY product_price $price_order, update_time $time_order";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get Collections failed";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else{ 
            $output = mysqli_fetch_row($result);
            $total_count = $output[0];
            if ($total_count > 0) {
                $sql = "SELECT * FROM product WHERE collections like '%$user_id%' ORDER BY product_price $price_order, update_time $time_order";
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    $resp = "Get Collections failed";
                    $status2 = new Status(500, "query error:" . mysqli_error($con));
                    $response2 = new Response($resp, $status2);
                } else {
                    $list = array();
                    $index = 0;
                    while($output = mysqli_fetch_row($result)) {
                        if ($output[13]){
                            $cc = json_decode($output[13]);
                            if(in_array($user_id, $cc)) {
                                if ($index >= $start && $index < $end) {
                                    $product = new Product($output[0], $output[1], $output[2], $output[3], $output[4], urldecode($output[5]),urldecode($output[6]), $output[7], $output[8], $output[9], $output[10], $output[11], $output[12], $output[13]);
                                    array_push($list, $product);
                                }
                                $index++;
                            }
                        } 
                    }
                    $list_resp = new ListResult(count($list), $list);
                    $status2 = new Status(200, "Get Collections successfully");
                    $response2 = new Response($list_resp, $status2);
                }
            } else {
                $list_resp = new ListResult(0, null);
                $status2 = new Status(200, "Get Collections successfully");
                $response2 = new Response($list_resp, $status2);
            }

        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);

?>