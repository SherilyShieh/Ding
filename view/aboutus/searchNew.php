<?php
    $key = $_GET["key"];
    $user = 'root';
    $password = 'root';
    $db = 'ding_database';
    $host = 'localhost';
    $port = 8889;
    $conn = mysqli_connect($host, $user, $password, $db, $port);
    $result = mysqli_query($conn, "select * from student where Name = '$key';") or die("connect error:" . mysqli_connect_error());
    while($row = mysqli_fetch_row($result)) {
        echo $row[0]. "-".$row[1]. "-".$row[2]. "-".$row[3];
    }
?>