<!DOCTYPE html>
<html>
<body>
<?php
session_start();
if (!isset($_SESSION['u']))
{ header("location:signin.html");
 exit;
 }
 ?>
 
 <h1> Welcome to ADD HOUSE page </h1> <br>
 <p> <a href="logout.php"> LOG OUT </a> </p>
</body>
</html>