<?php 
$x = $_POST['un'];
$y = $_POST['pas'];

$user = 'root';
$password = 'root';
$db = 'ding_database';
$host = 'localhost';
$port = 8889;
$con = mysqli_connect($host, $user, $password, $db, $port);
// $con = mysqli_connect("localhost", "root" , "" , "user");

$result = mysqli_query($con , "SELECT * FROM student WHERE Name = '$x' AND Password = '$y'");

if (mysqli_num_rows($result) == 1 )
{ 
session_start();
$_SESSION['u'] = $x;
header("location:addhouse.php");
exit;
}
else
{
header("location:signin.html");
}

mysqli_close($con);

?>
  