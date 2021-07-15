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

$address = $_POST["address"];
$city = $_POST["locality"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];
$postalCode = $_POST["postal_code"];


$updateAddress = $DB->query("UPDATE `address` SET `address` = ?, `city`=?,`lat`=?, `lng`=?, `postalCode`=? WHERE `userid` = ?", array($address, $city, $lat, $lng,$postalCode, $userId)); //Parameters must be ordered


if ($updateAddress != false) {
    echo "updated successfully";
}
