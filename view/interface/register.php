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

    function get_user($request, $con) {
        $sql = "SELECT * FROM User WHERE phone_nz = '$request->phone' AND `password` = '$request->password'";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            return new Status(500, "query error:" . mysqli_error($con));
        } else if (mysqli_num_rows($result) == 1){
            $output = mysqli_fetch_row($result);
            $store_name = $output[1] . "''s Store";
            $store_result = create_store($output[0], $store_name, $con);
            $cart_result = create_cart($output[0], $con);
            if ($store_result->code == 200 && $cart_result->code == 200) {
                return new Status(200, "Register successflly");
            } else {
                return new Status(503, "query error: \n Cart[" . $cart_result->msg . "] \n Store[" .$store_result->msg);
            }

        } else {
            return new Status(503, "query error: Multiple users");
        }
    }

    function create_store($owner_id, $store_name, $con) {
        $sql_exsit = "SELECT * FROM Store WHERE `owner_id` = $owner_id";
        $result = mysqli_query($con, $sql_exsit);
        if (mysqli_num_rows($result) == 0) {
            
            $sql = "INSERT INTO Store (owner_id, store_name, create_time) VALUES ('{$owner_id}', '{$store_name}', CURRENT_TIMESTAMP);";
            $result = mysqli_query($con, $sql);
            if (!$result) {
                return new Status(500, "query error:" . mysqli_error($con));
            } else {
                return new Status(200, "Create store success");
            }
        } else {
            return new Status(200, "The store is already been created");
        }

    }
    function create_cart($user_id, $con) {
        $sql_exsit = "SELECT * FROM Cart WHERE `user_id` = $user_id";
        $result = mysqli_query($con, $sql_exsit);
        if (mysqli_num_rows($result) == 0) {
            $sql = "INSERT INTO Cart (`user_id`, create_time) VALUES ('{$user_id}', CURRENT_TIMESTAMP);";
            $result = mysqli_query($con, $sql);
            if (!$result) {
                return new Status(500, "query error:" . mysqli_error($con));
            } else {
                return new Status(200, "Create cart success");
            }
        } else {
            return new Status(200, "The cart is already been created");
        }
    }
    // query database
    $sql = "INSERT INTO user (legal_name, phone_nz, `address`, `password`, nickname, email, create_time, update_time) VALUES ('{$request->legalName}', '{$request->phone}', '{$request->address}','{$request->password}','{$request->nickName}','{$request->email}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Register falied";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
        } else {
            $status2 = get_user($request, $con);
            if ($status2->code == 200) {
                $resp = "Register successfully";
            } else {
                $resp = "Register falied";
            }
        }
        $response2 = new Response($resp, $status2);
        JSON_STRING($response2);

    }
    mysqli_close($con);

?>