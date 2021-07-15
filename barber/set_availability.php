<?php

include_once("../database/db_connection.php");
require_once("../database/PDO.class.php");

$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

if(!empty($_POST['mydate']) && !empty($_POST['mytime']) && !empty($_POST['userid']) && !empty($_POST['checkvalue'])){
    $mydate = $_POST['mydate'];
    $mytime = $_POST['mytime'];
    $userid = $_POST['userid'];
    $checkvalue = $_POST['checkvalue'];

    $getRecord = $DB->query("SELECT * FROM schedule WHERE userid = ? AND `date` = ? AND `time` = ?", array($userid,$mydate,$mytime));
    
    if($checkvalue == 1){
        if( $getRecord != null){
            $updateSchedule = $DB->query("UPDATE `schedule` SET `availability` = 1 WHERE userid = ? AND `date` = ? AND `time` = ?", array($userid,$mydate, $mytime));//Parameters must be ordered
            echo "success0";
        }else{
            $setSchedule = $DB->query("INSERT IGNORE INTO `schedule`(`date`, `time`, `availability`, `userid`) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE availability = 1", array($mydate, $mytime, 1, $userid));//Parameters must be ordered
            echo "success1";
        }    
    }else{
        $updateSchedule = $DB->query("UPDATE `schedule` SET `availability` = 0 WHERE userid = ? AND `date` = ? AND `time` = ?", array($userid,$mydate, $mytime));//Parameters must be ordered
        echo "success2";
    }
}else{
    echo "missing values";
}

// echo $_POST['mydate'];
// echo $_POST['mytime'];
// echo $_POST['userid'];
// echo $_POST['checkvalue'];