<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";


    $orcond = '';
    if (isset($_GET["keyword"])) {
        $key = $_GET["keyword"];
        $orcond = '( department like ' ."'". '%'.$key.'%' ."'". ' or `type` like '."'".'%'.$key.'%'."'".' or product_name like '."'".'%'.$key.'%'."'". ')';
    }

    $andcond = '';
    if (isset($_GET["department"])) {
        $andcond = 'department = '."'".$_GET["department"]."'";
    }
    if (isset($_GET["type"])) {
        if (!empty($andcond)) {
            $andcond = $andcond.'and'.'`type` = '."'".$_GET["type"]."'";
        } else {
            $andcond = '`type` = '."'".$_GET["type"]."'";
        }
    }
    $cond = '';
    if (!empty($andcond)) {
        if (empty($orcond)) {
            $cond = '('.$andcond.')';
        } else {
            $cond = '('.$andcond.') and '. $orcond;
        }
    } else {
        if (!empty($orcond)) {
            $cond = $orcond;
        }
    }
    if (isset($_GET["starttime"])) {
        if (empty($cond)) {
            $cond = 'update_time BETWEEN '."'".$_GET["starttime"]."'".'and '."'".$_GET["endtime"]."'";
        } else {
            $cond = ''.$cond.' and '. 'update_time BETWEEN '."'".$_GET["starttime"]."'".'and '."'".$_GET["endtime"]."'";
        }
    }
    if (isset($_GET["lowprice"])) {
        if (empty($cond)) {
            $cond = 'product_price BETWEEN '.$_GET["lowprice"].' and '. $_GET["highprice"];
        } else {
            $cond = ''.$cond.' and '. 'product_price BETWEEN '.$_GET["lowprice"].' and '.$_GET["highprice"];
        }
    }
    $page = $_GET["page"];
    $sp = ($page - 1) * 10;
    $ep = $page * 10;
    $cond = $cond . ' order by update_time '.$_GET["timeorder"].', product_price '.$_GET["priceorder"];
    $sql_count = 'select COUNT(*)from product where' . $cond;
    $sql_list =  'select * from product where' . $cond . ' limit '. $sp . ', '. $ep;

    // echo $sql_list;

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
                $result2 = mysqli_query($con, $sql_list);
                if (!$result2) {
                    $resp = "Query failed";
                    $status = new Status(500, "query error:" . mysqli_error($con));
                    $response2 = new Response($resp, $status);
                } else { 
                    $response = array();
                    $index = 0;
                    while($output = mysqli_fetch_row($result2)) {
                        $product = new Product($output[0], $output[1], $output[2], $output[3], $output[4], urldecode($output[5]),urldecode($output[6]), $output[7], $output[8], $output[9], $output[10], $output[11], $output[12]);
                        $response[$index] = $product;
                        $index++;
                    }
                    $list_res = new ListResult($total_count, $response);
                    $status = new Status(200, "query successfully!");
                    $response2 =  new Response($list_res, $status);
                }
            } else {
                $list_res = new ListResult(0, null);
                $status = new Status(200, "query successfully");
                $response2 = new Response($list_res, $status);
            }
        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);

    

?>