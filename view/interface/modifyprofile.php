<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";

    // get request
    $body = file_get_contents('php://input');
    $request = json_decode($body);
    $userId = $request->userid;
    $modify = $request->info;
    
    $index = 0;
    $sub = '';
    foreach($modify as $key => $value) 
    {
        
        $sub =  $sub . $key. '=' ."'". $value. "'" .',';
        
    }
    $rest  = substr(  $sub,0,strlen($sub)-1);
    // echo $rest;
    // init connection
    Global $user;
    Global $password;
    Global $db;
    Global $host;
    Global $port;
    $con = new mysqli($host,$user,$password,$db,$port);

    $sql = "UPDATE user SET $rest WHERE id = $userId";
    // echo $sql;
    if (!$con) {
        die("connect error:" . mysqli_connect_error());
        $status1 = new Status(500, "connect error:" . mysqli_connect_error());
        $response1 = new Response(null, $status1);
        JSON_STRING($response1);
    } else{
        $result = mysqli_query($con, $sql);
        if (!$result) {
            $resp = "Update falied";
            $status2 = new Status(500, "query error:" . mysqli_error($con));
        } else {
            $resp = "Update successfully";
            $status2 = new Status(200, "success");
        }
        $response2 = new Response($resp, $status2);
        JSON_STRING($response2);

    }
    mysqli_close($con);
?>