<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    $user_id = $_GET['user_id'];

    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);

    
    $sql = "SELECT COUNT(*) FROM wishlist WHERE `buyer_id` = '$user_id'";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get wish list failed";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else{ 
            $output = mysqli_fetch_row($result);
            $total_count = $output[0];
            if ($total_count > 0) {
                $sql = "SELECT * FROM wishlist WHERE `buyer_id` = '$user_id'";
                $result = mysqli_query($con, $sql);
                if (!$result) {
                    $resp = "Get wish list failed";
                    $status2 = new Status(500, "query error:" . mysqli_error($con));
                    $response2 = new Response($resp, $status2);
                } else {
                    $wishlist = array();
                    $index = 0;
                    $isExist = false;
                    while($output = mysqli_fetch_row($result)) {
                        if (empty($wishlist)) {
                            $wishwarp = new WishWrap($output[4], $output[5], array());
                            $wish = new Wish($output[0], $output[1], $output[2], $output[3], $output[4], $output[5], $output[6], $output[7], $output[8], $output[9], $output[10], $output[11], $output[12]);
                            array_push($wishwarp->products, $wish);
                            array_push($wishlist, $wishwarp);
                        } else {
                            foreach($wishlist as $item) {
                                if ($item->store_id === $output[4]) {
                                    $wish = new Wish($output[0], $output[1], $output[2], $output[3], $output[4], $output[5], $output[6], $output[7], $output[8], $output[9], $output[10], $output[11], $output[12]);
                                    array_push($item->products, $wish);
                                    $isExist = true;
                                }
                            }
                            if (!$isExist) {
                                $wishwarp = new WishWrap($output[4], $output[5], array());
                                $wish = new Wish($output[0], $output[1], $output[2], $output[3], $output[4], $output[5], $output[6], $output[7], $output[8], $output[9], $output[10], $output[11], $output[12]);
                                array_push($wishwarp->products, $wish);
                                array_push($wishlist, $wishwarp);
                            }
                            $isExist = false;

                        }

                    }
                    $status2 = new Status(200, "Get wish list successfully");
                    $resp_list = new ListResult($total_count, $wishlist);
                    $response2 = new Response($resp_list, $status2);
                }
 
            } else {
                $status2 = new Status(200, "Get wish list successfully");
                $resp_list = new ListResult(0, null);
                $response2 = new Response($resp_list, $status2);
            }

        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>