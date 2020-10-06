<?php
    // echo "<h1 style='color:red;'> Hello PHP </h1>";
    // $mark = 55;
    // if ($mark < 50) {
    //     echo "Fail";
    // } else if ($mark >= 50 AND $mark <= 60) {
    //     echo "Grade = B";
    // } else {
    //     echo "Grade = A";
    // }

    // while ($mark >= 45) {
    //     echo "<h6>".$mark."</h6>";
    //     $mark = $mark - 1;
    // }
    $n = $_GET["employername"];
    $e = $_GET["employerEmail"];
    $p = $_GET["employerPhone"];
    
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
    }
    mysqli_query($con, "INSERT INTO student (Name, Email, Phone) VALUES ('{$n}', '{$e}', '{$p}');");

    mysqli_close($con);

    echo "<h1>Thanks for your registration!</h1>"
    
    // echo "Your name is:".$_GET["employername"]."</br>";
?>
