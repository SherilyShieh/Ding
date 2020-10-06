<?php
header('Access-Control-Allow-Origin:*'); 
header('Content-type: application/json');
class student {
    var $id;
    var $name;
    var $email;
    function __construct($par1, $par2, $par3) {
        $this->id = $par1;
        $this->name = $par2;
        $this->email = $par3;
    }
}
function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}
// echo $_GET["name"];
    $user = 'root';
    $password = 'root';
    $db = 'ding_database';
    $host = 'localhost';
    $port = 8889;

    // $link = mysqli_init();
    // $success = mysqli_real_connect(
    //     $link,
    //     $host,
    //     $user,
    //     $password,
    //     $db,
    //     $port
    // );
    // echo $success;
    $con = new mysqli(
        $host,
        $user,
        $password,
        $db,
        $port);
    if (!$con)
    {
        die("connect error:" . mysqli_connect_error());
    } else {
        // echo "1111";
        // $result = mysqli_query($con, "SELECT * FROM student", MYSQLI_USE_RESULT);
        $result = mysqli_query($con, "SELECT * FROM student", MYSQLI_STORE_RESULT);
        // console_log($result);
        $response = array();
        $index = 0;
        while($output = mysqli_fetch_row($result)) {
            $student = new student($output[0], $output[1], $output[2]);
            $response[$index] = $student;
            $index++;
        }
        // console_log($response);
        $json = json_encode($response);
        if ($json === false) {
            // Avoid echo of empty string (which is invalid JSON), and
            // JSONify the error message instead:
            $json = json_encode(["jsonError" => json_last_error_msg()]);
            if ($json === false) {
                // This should not happen, but we go all the way now:
                $json = '{"jsonError":"unknown"}';
            }
            // Set HTTP response status code to: 500 - Internal Server Error
            http_response_code(500);
        }
        echo $json;
    }

    mysqli_close($con);
?>