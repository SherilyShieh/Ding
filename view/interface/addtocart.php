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

    function insertProduct($cart_id, $store_name, $request, $con) {
        $sql = "SELECT * FROM Wishlist WHERE buyer_id = '$request->buyer_id' AND product_id = '$request->product_id' AND product_size = '$request->product_size' AND product_color = '$request->product_color'";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $status = new Status(503, "query error:" . mysqli_error($con));
            return new Response("Add product to cart failed!", $status);
        } else {
            if($output = mysqli_fetch_row($result)) {
            
                $wish_id = $output[0];
                $wish_count = $output[11] + $request->product_count;
                $sql = "UPDATE Wishlist SET product_count = '$wish_count' WHERE id = '$wish_id'";

                $result = mysqli_query($con, $sql);
                if (!$result) {
                    $status = new Status(503, "query error:" . mysqli_error($con));
                    return new Response("Add product to cart failed!", $status);

                } else {
                    $status = new Status(200, "Add product to cart successfully!");
                    return new Response("Add product to cart successfully!", $status);
                }
            } else {
                $sql = "INSERT INTO Wishlist (cart_id, buyer_id, buyer_name, store_id, store_name, product_id, product_name, product_icon, product_size, product_color, product_count, product_price, create_time, update_time) 
                VALUES ('{$cart_id}', '{$request->buyer_id}', '{$request->buyer_name}', '{$request->store_id}', '{$store_name}', '{$request->product_id}', '{$request->product_name}', '{$request->product_icon}','{$request->product_size}',
                '{$request->product_color}', '{$request->product_count}', '{$request->product_price}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    $status = new Status(503, "query error:" . mysqli_error($con));
                    return new Response("Add product to cart failed!", $status);
    
                } else {
                    $status = new Status(200, "Add product to cart successfully!");
                    return new Response("Add product to cart successfully!", $status);
                }
            }


        }

 
    }

    if (empty($request) || empty($request)) {
        echo 'Please upload nessary infomation!';
    }

    $sql = "SELECT * FROM cart WHERE `user_id` = $request->buyer_id";
    
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "create falied";
            $status = new Status(500, "query error:" . mysqli_error($con));
            $response = new Response($resp, $status);
        } else {
            // todo
            $output = mysqli_fetch_row($result);
            $cart_id = $output[1];
            $sql = "SELECT * FROM store WHERE `id` = $request->store_id";
            $result = mysqli_query($con, $sql);
            if (!$request) {
                $resp = "create falied";
                $status = new Status(500, "query error:" . mysqli_error($con));
                $response = new Response($resp, $status);
            } else {
                $output = mysqli_fetch_row($result);
                $store_name = $output[2];
                $temp = explode("'", $store_name);
                $store_name = join("''", $temp);
                $response = insertProduct($cart_id, $store_name, $request, $con);
            }

        }
        JSON_STRING($response);

    }
    mysqli_close($con);





?>