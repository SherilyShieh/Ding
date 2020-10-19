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

    $sql = "SELECT * FROM banner";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Get Banners failed";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
            $response2 = new Response($resp, $status2);
        } else{ 
            $banners = array();
            $index = 0;
            while($output = mysqli_fetch_row($result)) {
                $banner = new Banner($output[1], $output[2]);
                $banners[$index] = $banner;
                $index++;
            }
            $status2 = new Status(200, "Get Banners successfully");
            $response2 = new Response($banners, $status2);
        } 
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>