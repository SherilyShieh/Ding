<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $body = file_get_contents('php://input');
    $request = json_decode($body);

    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);



    function createProduct($store_id, $con, $request){
        $product_icon = urlencode($request->product_icon);
        $product_content_img = urlencode($request->product_content_img);
        $sql = "INSERT INTO Product (store_id, department, `type`, product_name, product_icon, product_content_img,product_size, product_color, product_price, product_detail, create_time, update_time) 
        VALUES ('{$store_id}', '{$request->department}', '{$request->type}', '{$request->product_name}', '{$product_icon}', '{$product_content_img}', '{$request->product_size}', '{$request->product_color}', '{$request->product_price}', '{$request->product_detail}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
        if (!$con) {
            die("connect error:" . mysqli_connect_error());
            $status1 = new Status(500, "connect error:" . mysqli_connect_error());
            return new Response(null, $status1);
        } else{
            $result = mysqli_query($con, $sql);
            if (!$result) {
                $resp = "Create product falied";
                $status2 = new Status(500, "query error:" . mysqli_error($con));
            } else {
                $resp = "Create product successfully";
                $status2 = new Status(200, "success");
            }
            return new Response($resp, $status2);
        }
    }

    $sql = "SELECT * FROM Store WHERE owner_id = '$request->userid'";
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
            $response2 = createProduct($store_id, $con, $request);
        } else {
            $resp = "Query failed";
            $status2 = new Status(503, "Multiple stores");
            $response2 = new Response($resp, $status2);
        }
        JSON_STRING($response2);

    }

    mysqli_close($con);


?>