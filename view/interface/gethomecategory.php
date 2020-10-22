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

    function getTypes($con) {
        $sql = "SELECT * FROM `type`";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get types' information falied!";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
           return new Response($resp, $status2);
        } else { 
            $types = array();
            $index = 0;
            while($output = mysqli_fetch_row($result)){
                $types[$index] = $output[1];
                $index++;
            }
            $status2 = new Status(200, "Get types' infromation successfully!");
            return new Response($types, $status2);
        } 
    }
    function getproducts($con, $department) {
        $sql = "SELECT * FROM product WHERE  department = '$department' limit 0,4";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get products' information falied!";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
           return new Response($resp, $status2);
        } else { 
            $products = array();
            $index = 0;
            while($output = mysqli_fetch_row($result)){
                $product = new Product($output[0], $output[1], $output[2], $output[3], $output[4], urldecode($output[5]),urldecode($output[6]), $output[7], $output[8], $output[9], $output[10], $output[11], $output[12], $output[13]);
                $products[$index] = $product;
                $index++;
            }
            $status2 = new Status(200, "Get products' infromation successfully!");
            return new Response($products, $status2);
        } 
    }
    $sql = "SELECT * FROM department";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get categories' information falied!";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else { 
            $my_types=getTypes($con);
            if ($my_types->status->code == 200) {
                $categories = array();
                $index = 0;
                while($output = mysqli_fetch_row($result)) {
                    $cur_products = getproducts($con, $output[1]);
                    if ($cur_products->status->code == 200) {
                        $category = new Category($output[1], $output[2], $my_types->data, $cur_products->data);
                        $categories[$index] = $category;
                        $index++;
                    } else {
                        JSON_STRING($cur_products);
                        return;
                    }

                }
                if (count($categories) > 0) {
                    $status2 = new Status(200, "Get categories' infromation successfully!");
                    $response2 = new Response($categories, $status2);
                } else {
                    $status2 = new Status(503, "Get categories' infromation failed!");
                    $response2 = new Response("Get categories' infromation failed!", $status2);
                }
            } else {
                $response2 = $my_types;
            }

        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>