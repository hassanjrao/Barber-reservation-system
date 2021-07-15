<?php
if (session_id() == '') {
    session_start();
}
include_once("database/db_connection.php");
require_once("database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);



if (isset($_SESSION["lat"])) {

    $lat = $_SESSION["lat"];
    $lng = $_SESSION["lng"];

    $radius = $_POST["radius"];


    if (isset($_POST["radio"])) {

        $getNearestBarbers = $DB->query(
            " SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(( $lat - lat) *  pi()/180 / 2), 2) +COS( $lat * pi()/180) * COS(lat * pi()/180) * POWER(SIN(( $lng - lng) * pi()/180 / 2), 2) ))) as distance  
    from address
    having  distance <= ?
    order by distance",
            array($radius)
        );


        $response = "";

        if ($getNearestBarbers != NULL) {
            foreach ($getNearestBarbers as $barber) {

                $getBarber = $DB->query("SELECT * FROM users WHERE userid=?", array($barber["userid"]));

                $getBarberDetails = $DB->query("SELECT * FROM barber WHERE userid=?", array($barber["userid"]));


                if ($getBarberDetails[0]["profilePhoto"] != NULL) {
                    $img_src = "images/user_photo/" . $getBarberDetails[0]["profilePhoto"];
                } else {
                    $img_src = "images/img04.jpg";
                }



                $response .= '

            <div class="header">
        
                <div class="user-col">
                    <div class="img-box">
                        <img src="' . $img_src . '" width="122" height="138" alt="img description">
                    </div>
                    <div class="text-box">
                        <strong class="title">' . $getBarber[0]["name"] . ' </strong>
                        <ul class="star-rating">
                            <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                            <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                            <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                            <li>300</li>
                        </ul>
                    </div>
                </div>
                <div class="text-col">
                    <strong class="text"><i class="icon-map-marker"></i>' . round($barber["distance"], 2) . ' Km <span>From you</span></strong>
                </div>
            </div>';
            }
            echo $response;
        } else {
            echo "<br><h5>Sorry, No Barber found in your area</h5>";
        }
    } else if (isset($_POST["searchbar"]) && $_POST["barber_name"] != "") {

        $barber_name = $_POST["barber_name"];

        $getNearestBarbers = $DB->query(
            " SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(( $lat - lat) *  pi()/180 / 2), 2) +COS( $lat * pi()/180) * COS(lat * pi()/180) * POWER(SIN(( $lng - lng) * pi()/180 / 2), 2) ))) as distance  
                from address
                having  distance <= ?
                order by distance",
            array($radius)
        );


        $response = "";
      

        if ($getNearestBarbers != NULL) {
           
            foreach ($getNearestBarbers as $barber) {

                $getBarber = $DB->query("SELECT * FROM users WHERE userid=? and name LIKE  ?", array($barber["userid"], "%".$barber_name."%"));


             

                if (!empty($getBarber)) {
                    $barber_id = $getBarber[0]["userid"];
                    $getBarberDetails = $DB->query("SELECT * FROM barber WHERE userid=?", array($barber_id));


                    if ($getBarberDetails[0]["profilePhoto"] != NULL) {
                        $img_src = "images/user_photo/" . $getBarberDetails[0]["profilePhoto"];
                    } else {
                        $img_src = "images/img04.jpg";
                    }



                    $response .= '

                <div class="header">
        
                    <div class="user-col">
                        <div class="img-box">
                            <img src="' . $img_src . '" width="122" height="138" alt="img description">
                        </div>
                        <div class="text-box">
                            <strong class="title">' . $getBarber[0]["name"] . ' </strong>
                            <ul class="star-rating">
                                <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                                <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                                <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                                <li>300</li>
                            </ul>
                        </div>
                    </div>
                    <div class="text-col">
                        <strong class="text"><i class="icon-map-marker"></i>' . round($barber["distance"], 2) . ' Km <span>From you</span></strong>
                    </div>
                </div>';
               
                }
               

               
            }

            echo $response;

            if($response==""){
                echo "<br><h5> No Barber found</h5>";
            }
        } 
        
        else {
            echo "<br><h5>Sorry, No Barber found in your area</h5>";
        }
    } else if ($_POST["barber_name"] == "") {

        $getNearestBarbers = $DB->query(
            " SELECT * , (3956 * 2 * ASIN(SQRT( POWER(SIN(( $lat - lat) *  pi()/180 / 2), 2) +COS( $lat * pi()/180) * COS(lat * pi()/180) * POWER(SIN(( $lng - lng) * pi()/180 / 2), 2) ))) as distance  
    from address
    having  distance <= ?
    order by distance",
            array($radius)
        );


        
        $response = "";

        if ($getNearestBarbers != NULL) {
            foreach ($getNearestBarbers as $barber) {

                $getBarber = $DB->query("SELECT * FROM users WHERE userid=?", array($barber["userid"]));

                $getBarberDetails = $DB->query("SELECT * FROM barber WHERE userid=?", array($barber["userid"]));


                if ($getBarberDetails[0]["profilePhoto"] != NULL) {
                    $img_src = "images/user_photo/" . $getBarberDetails[0]["profilePhoto"];
                } else {
                    $img_src = "images/img04.jpg";
                }



                $response .= '

            <div class="header">
        
                <div class="user-col">
                    <div class="img-box">
                        <img src="' . $img_src . '" width="122" height="138" alt="img description">
                    </div>
                    <div class="text-box">
                        <strong class="title">' . $getBarber[0]["name"] . ' </strong>
                        <ul class="star-rating">
                            <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                            <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                            <li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
                            <li>300</li>
                        </ul>
                    </div>
                </div>
                <div class="text-col">
                    <strong class="text"><i class="icon-map-marker"></i>' . round($barber["distance"], 2) . ' Km <span>From you</span></strong>
                </div>
            </div>';
            }
            echo $response;
        } else {
            echo "<br><h5>Sorry, No Barber found in your area</h5>";
        }
    }
} else {
    echo "Lat, Lng not found";
}
