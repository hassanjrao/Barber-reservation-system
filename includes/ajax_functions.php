<?php

include_once("../database/db_connection.php");
require_once("../database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);


if (isset($_REQUEST["functionName"])) {

    $functionName = $_REQUEST["functionName"];

    $functionName($DB);
}



//  Check User Email

function check_user_email($DB)
{

    $email = strtolower(trim($_REQUEST['email']));

    $getEmail = $DB->query("SELECT email FROM users WHERE email=?", array($email));

    if ($getEmail != null ) {
        echo json_encode("Email Already exists, please sign in");
    } else {
        // echo json_encode("Good to go!");
        echo json_encode(true);
    }
    
}

function check_old_email($DB)
{

    $email = strtolower(trim($_REQUEST['email']));
    $barber_id = $_REQUEST['barber_id'];

    $getEmail = $DB->query("SELECT email FROM users WHERE email=? and userid=?", array($email,$barber_id));

    if ($getEmail == null ) {
        echo json_encode("Current Email Does Not Match");
    } else {
        // echo json_encode("Good to go!");
        echo json_encode(true);
    }
    
}

function check_new_email($DB)
{

    $email = strtolower(trim($_REQUEST['email']));
    $barber_id = $_REQUEST['barber_id'];

    $getEmail = $DB->query("SELECT email FROM users WHERE email=? and userid!=?", array($email,$barber_id));

    if ($getEmail != null ) {
        echo json_encode("This email is already registered");
    } else {
        // echo json_encode("Good to go!");
        echo json_encode(true);
    }
    
}

function check_old_password($DB)
{

    $password = $_REQUEST["oldPassword"];
    $barber_id = $_REQUEST['barber_id'];

    $getPassword = $DB->query("SELECT password FROM users WHERE  password=? and userid=?", array($password,$barber_id));

    if ($getPassword == null ) {
       
        echo json_encode("Incorrect password, please enter correct password.");
    } else {
        // echo json_encode("Good to go!");
        echo json_encode(true);
    }
    
}


/**

 * check password stength

 */

function check_password_strength()

{

    $password = isset($_REQUEST["newPassword"]) ? trim($_REQUEST["newPassword"]) : "";

    // Validate password strength

    $uppercase = preg_match('@[A-Z]@', $password);

    $lowercase = preg_match('@[a-z]@', $password);

    $number    = preg_match('@[0-9]@', $password);

    $specialChars = preg_match('@[^\w]@', $password);

    if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {

        echo json_encode("The password must contain 8 characters and at least one number, one special character, one lower alphabet, one upper alphabet, and an unauthorized underscore. Example password: Test@132");
    } else {

        echo json_encode(true);
    }
}
