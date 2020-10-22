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

    $i = urlencode($request->icon);
    $sql = "INSERT INTO department (department_name, icon, create_time, update_time) VALUES ('{$request->departmentName}', '{$i}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "create falied";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
        } else {
            $resp = "create successfully";
            $status2 = new Status(200, "success");
        }
        $response2 = new Response($resp, $status2);
        JSON_STRING($response2);

    }
    mysqli_close($con);


?>