<?php
if (session_id() == '') {
    session_start();
}

if (isset($_SESSION['user_email'])) {
    if ($_SESSION['user_type'] != 2) {
        header("location: ../index.php");
    }
} else {
    header("location: ../login.php");
}


include_once("../database/db_connection.php");
require_once("../database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

$email = $_SESSION['user_email'];
$userId = $_SESSION['user_id'];

$radius = $_POST["radius"];


$updateRadius = $DB->query("UPDATE `address` SET `radius` = ? WHERE `userid` = ?", array($radius,$userId)); //Parameters must be ordered


if ($updateRadius != false) {
    echo "updated successfully";
}
