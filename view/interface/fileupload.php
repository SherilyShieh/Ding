<?php
    header('Access-Control-Allow-Origin:*'); 
    header('Content-type: application/json');
    Include_once "./common.php";
    //get file
    $upfile=$_FILES["pic"];
    //img type
    $typelist=array("image/jpeg","image/jpg","image/png","image/gif");
    $path="./uploads/";// define one floder to store pictures in serve
    $link_path = "/view/interface/uploads/";
    //Filter error numbers in uploaded files
    if($upfile["error"]>0){
        switch($upfile['error']){//error code
            case 1:
                $info="The uploaded file exceeds the maximum value in the upload_max_filesize option in php.ini.";
                break;
            case 2:
                $info="The upload file size exceeds the maximum value in the MAX_FILE_SIZE option of the html.";
                break;
            case 3:
                $info="The file is only partially uploaded.";
                break;
            case 4:
                $info="No files were uploaded.";
                break;
            case 5:
                $info="Temporary folder not found.";
                break;
            case 6:
                $info="File write failed!";break;
        }die("Error uploading file, reason:".$info);
    }
    //Filter the file size of this upload (choose by yourself)
    if($upfile['size']>1024*1024){
        die("Upload file size exceeds limit");
    }
    //Category Filter
    if(!in_array($upfile["type"],$typelist)){
        die("Uploading file types is illegal!".$upfile["type"]);
    }
    //File name definition after upload (get a random file name)
    $fileinfo=pathinfo($upfile["name"]);//Parse the uploaded file name
    do{ 
        $newfile=date("YmdHis").rand(1000,9999).".".$fileinfo["extension"];
    }while(file_exists($path.$newfile));
    // Execute file upload
    // Determine if it is an uploaded file
    if(is_uploaded_file($upfile["tmp_name"])){
            // Perform file uploads (move file uploads)
            if(move_uploaded_file($upfile["tmp_name"],$path.$newfile)){
                $status = new Status(200, "File upload successful!");
                $response = new Response($link_path.$newfile, $status);
                JSON_STRING($response);
            }else{
            die("File upload failed!");
        }
    }else{
    die("Not an upload file!");
  }
?>
