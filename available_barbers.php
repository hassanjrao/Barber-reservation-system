<?php

session_start();



// if (isset($_SESSION['user_email'])) {
// 	if ($_SESSION['user_type'] != 1) {
// 		header("location: index.php");
// 	}
// } else {
// 	header("location: login.php");
// }

// $email = $_SESSION['user_email'];
// $userId = $_SESSION['user_id'];


include_once("database/db_connection.php");
require_once("database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);


if (isset($_POST["search_barbers"]) || isset($_SESSION["lat"])) {


    if (isset($_POST["search_barbers"])) {
        $lat = $_POST["lat"];
        $lng = $_POST["lng"];
        $_SESSION["lat"] = $lat;
        $_SESSION["lng"] = $lng;
    } else {
        $lat = $_SESSION["lat"];
        $lng = $_SESSION["lng"];
    }





    $getNearestBarbers = $DB->query(
        " SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(( $lat - lat) *  pi()/180 / 2), 2) +COS( $lat * pi()/180) * COS(lat * pi()/180) * POWER(SIN(( $lng - lng) * pi()/180 / 2), 2) ))) as distance  
    from address
    having  distance <= ?
    order by distance",
        array(10)
    );
} else {
    header("location: index.php");
}



?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Available Barbers</title>
    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link media="all" rel="stylesheet" href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
    <link media="all" rel="stylesheet" href="css/main.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
    <script>
        window.jQuery || document.write('<script src="js/jquery-3.3.1.min.js" defer><\/script>')
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" defer></script>
    <script src="js/jquery.main.js" defer></script>

    <?php if (!isset($_SESSION['user_type'])) {
    ?>
        <style>
            .info-section .right-content {
                width: 100.5% !important;

            }
        </style>
    <?php } else if ($_SESSION['user_type'] != 1) {
    ?>
        <style>
            .info-section .right-content {
                width: 100.5% !important;

            }
        </style>
    <?php
    } ?>
</head>

<body>
    <div id="wrapper">
        <?php include_once("includes/header.php") ?>
        <main id="main">
            <div class="container info-section three-cols">
                <div class="content-block">


                    <?php if (isset($_SESSION['user_type']) && $_SESSION['user_type'] == 1) {


                    ?>
                        <aside class="sidebar">
                            <?php include_once("includes/client_panel_left_bar.php") ?>
                        </aside>
                    <?php } ?>


                    <div class="right-content">
                        <div class="center-content">
                            <form action="#" class="search-form">
                                <button type="submit">
                                    <img src="images/search-img.png" alt="Image Description">
                                </button>
                                <input class="input-control" type="text" id="search-bar" oninput="searchBarber()" placeholder="Search Barber">
                            </form>

                            <div id="barbers-div">
                                <?php



                                if ($getNearestBarbers != NULL) {
                                    foreach ($getNearestBarbers as $barber) {

                                        $getBarber = $DB->query("SELECT * FROM users WHERE userid=?", array($barber["userid"]));

                                        $getBarberDetails = $DB->query("SELECT * FROM barber WHERE userid=?", array($barber["userid"]));



                                ?>

                                        <div class="header">
                                            <div class="user-col">
                                                <div class="img-box">
                                                    <img src=" <?php echo $getBarberDetails[0]["profilePhoto"] != NULL ? "images/user_photo/" . $getBarberDetails[0]["profilePhoto"] : "images/img04.jpg" ?>" width="122" height="138" alt="img description">
                                                </div>
                                                <div class="text-box">
                                                    <strong class="title"><?php echo $getBarber[0]["name"] ?> </strong>
                                                    <ul class="star-rating">
                                                        <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                                                        <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                                                        <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                                                        <li>300</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="text-col">
                                                <strong class="text"><i class="icon-map-marker"></i> <?php echo round($barber["distance"], 2); ?> Km <span>From you</span></strong>
                                            </div>
                                        </div>
                                <?php


                                    }
                                } else {
                                    echo "<br><h5>Sorry, No Barber found in your area</h5>";
                                }

                                ?>
                            </div>


                        </div>
                        <aside class="right-bar no-border pt-0">
                            <div class="radius-away">
                                <strong class="title">Radius away from you</strong>
                                <div class="range-slider-wrapper">
                                    <!-- <div class="slider" data-min="0" data-max="10" data-value="10" data-step="1"></div> -->
                                    <input type="range" class="form-control" min="0" max="10" value="10" name="radius" onchange="changeRadius()" class="slider" id="radius">

                                </div>
                                <ul class="km-list">
                                    <li>1 km</li>
                                    <li>5 km</li>
                                    <li>10 km</li>
                                </ul>
                            </div>
                            <ul class="filters">
                                <li>
                                    <input type="radio" id="Barbieri" name="select" checked>
                                    <label for="Barbieri" class="filter">Barbers</label>
                                    <span class="circle"></span>
                                </li>
                                <li>
                                    <input type="radio" id="Parrucchieri" name="select">
                                    <label for="Parrucchieri" class="filter">Parrucchieri</label>
                                    <span class="circle"></span>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>


<script>
    function changeRadius() {

        const radius = document.getElementById("radius").value;

        $.ajax({
            type: "POST",
            url: "search_barbers.php",
            data: {
                radius: radius,
                radio: true
            },
            cache: false,
            success: function(data) {
                // $("#resultarea").text(data);
                console.log(data);

                $("#barbers-div").html(data);
            }
        });
    }

    function searchBarber() {

        const radius = document.getElementById("radius").value;

        const barber_name = document.getElementById("search-bar").value;


        $.ajax({
            type: "POST",
            url: "search_barbers.php",
            data: {
                radius: radius,
                barber_name: barber_name,
                searchbar: true,
            },
            cache: false,
            success: function(data) {
                // $("#resultarea").text(data);
                console.log(data);

                $("#barbers-div").html(data);
            }
        });


    }
</script>

</html>