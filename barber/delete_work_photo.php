<?php
include_once("../database/db_connection.php");
require_once("../database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

if( !empty($_POST['photoid'])){
    $photoid = $_POST['photoid'];

    $getPhoto = $DB->query("SELECT * FROM workphotos WHERE photoId = ?", array($photoid));

    // echo $getPhoto[0]['photo'];
    // var_dump($getPhoto);
    $deletePhoto = $DB->query("DELETE FROM `workphotos` WHERE photoId = ?", array($photoid));//Parameters must be ordered
    if($getPhoto != null && $deletePhoto){
        unlink("../images/work_photos/".$getPhoto[0]['photo']);
    }else{
        echo "Error! couldn't delete selected photo";
    }
}else{
    echo "missing data";
}