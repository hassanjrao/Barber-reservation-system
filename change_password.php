<?php 


if (session_id() == '') {
	session_start();
}

if (isset($_SESSION['user_email'])) {
	if ($_SESSION['user_type'] != 1) {
		header("location: index.php");
	}
} else {
	header("location: login.php");
}

$email = $_SESSION['user_email'];
$userId = $_SESSION['user_id'];
include_once("database/db_connection.php");
require_once("database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);


if (isset($_POST["submitChangePass"])) {

	$newPass = $_POST["newPassword"];


	$updatePass = $DB->query("UPDATE `users` SET `password` = ? WHERE `userid` = ?", array($newPass, $userId)); //Parameters must be ordered


	if ($updatePass != false) {
		echo "updated successfully";
	}
}
