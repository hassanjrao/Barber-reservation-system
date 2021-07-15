<?php

include_once("../database/db_connection.php");
require_once("../database/PDO.class.php");

$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

if(!empty($_POST['type']) && !empty($_POST['cost']) && !empty($_POST['duration']) && !empty($_POST['availability'])){

    $type = $_POST['type'];
    $cost = $_POST['cost'];
    $duration = $_POST['duration'];
    $availability = $_POST['availability'];
    $userid = $_POST['userid'];

    
    print_r($_POST);
    $getRecord = $DB->query("SELECT * FROM `cuttingtype` WHERE `userid` = ? AND `type` = ?", array($userid, $type));
    if($availability == 1){
        if( $getRecord != null){
            $updatePrice = $DB->query("UPDATE `cuttingtype` SET `availability` = 1, price = ?, duration = ? WHERE userid = ? AND `type` = ?", array($cost,$duration,$userid, $type));//Parameters must be ordered
            echo "success0";
        }else{
            $setPrice = $DB->query("INSERT INTO `cuttingtype`(`type`, `price`, `duration`, `availability`, `userid`) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE availability = 1", array($type, $cost, $duration, $availability, $userid));//Parameters must be ordered
            echo "success1";
        }    
    }else{
        $updatePrice = $DB->query("UPDATE `cuttingtype` SET `availability` = 0, price = ?, duration = ?  WHERE userid = ? AND `type` = ?", array($cost,$duration,$userid,$type));//Parameters must be ordered
        echo "success2";
    }
}else{
    echo "missing values";
}