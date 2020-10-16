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
    // query database
    $sql = "INSERT INTO feedback (`user_id`, cur_webpage, `name`, email, content, create_time) VALUES ('{$request->user_id}', '{$request->cur_webpage}', '{$request->name}','{$request->email}','{$request->content}',CURRENT_TIMESTAMP);";
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Submit feedback falied!";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
        } else {
            $resp = "Submit feedback successfully!";
            $status2 = new Status(200, "Submit feedback successfully!");
        }
        $response2 = new Response($resp, $status2);
        JSON_STRING($response2);

    }
    mysqli_close($con);


?>