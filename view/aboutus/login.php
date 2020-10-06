<?php
//Step1: Read form inputs
$x = $_POST['un'];
$y = $_POST['pass'];

//step2: connect to Database
$user = 'root';
$password = 'root';
$db = 'ding_database';
$host = 'localhost';
$port = 8889;
$con = mysqli_connect($host, $user, $password, $db, $port);

//step3: Read Data from Database
$result = mysqli_query($con , "SELECT * FROM login ");
function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . ');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}
//step4: check table data record by record
while ( $row = mysqli_fetch_row($result) )
{ 
    console_log($row);
    if ( $row[1] == $x && $row[2] == $y )	
        header ("location:http://www.weltec.ac.nz");
}
echo "<html>
<head>
<title> Login </title>
</head>
<body bgcolor='yellow'>
<h1> Wrong User Name and Password </h1>
<form  action='login.php'   method='POST'>
User Name: <input  type='text'  name='un'> <br/> <br/>
Password: <input type='text'  name='pass' > <br/> <br/>
<input type='submit' value=' login '>
</form>
</body>
</html>";

?>