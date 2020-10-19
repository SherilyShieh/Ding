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

    function createSingleOrder($item, $con) {
        $temp = explode("'", $item->store_name);
        $saler_name = $temp[0];
        $store_name = join("''", $temp);
        $temp2 = explode("'", $item->product_name);
        $product_name = join("''", $temp2);
        $sql = "SELECT * FROM store WHERE id = $item->store_id";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "create falied";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            JSON_STRING(new Response($resp, $status2));
            return false;
        } else {
            $output = mysqli_fetch_row($result);
            $saler_id = $output[1];
            $sql = "INSERT INTO `order` (buyer_id, buyer_name, saler_id, saler_name, store_id, store_name, product_id, product_name, product_icon, product_price, product_size, product_color, product_count, create_time)
            VALUES ('{$item->buyer_id}', '{$item->buyer_name}', '{$saler_id}', '{$saler_name }', '{$item->store_id}', '{$store_name}', '{$item->product_id}', '{$product_name}', '{$item->product_icon}', 
            '{$item->product_price}', '{$item->product_size}', '{$item->product_color}', '{$item->product_count}',CURRENT_TIMESTAMP);";
            $result = mysqli_query($con, $sql);
            if (!$result) {
                $resp = "create falied";
                $status2 = new Status(500, "query error:" . mysqli_error($con));
                JSON_STRING(new Response($resp, $status2));
                return false;
            } 
        }
        return true;
    }

    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $status = true;
        foreach ($request->orders as $value) {
            $status = $status && createSingleOrder($value, $con);
        }
        if($status) {
            $response = new Response('Create orders successfully!', new Status(200, 'Create orders successfully!'));
        } else {
            $response = new Response('Create orders failed!', new Status(503, 'Create orders failed!'));
        }

        JSON_STRING($response);

    }
    mysqli_close($con);


?>