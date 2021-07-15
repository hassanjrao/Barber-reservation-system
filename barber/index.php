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
require_once("../database/PDO.class.php");;
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

$email = $_SESSION['user_email'];
$userId = $_SESSION['user_id'];

if (isset($_POST['save_profile_info'])) {
	$fullname = $_POST['fullname'];
	$description = $_POST['description'];
	$coverPhoto = "default_cover.jpg";
	$profilePhoto = "default_photo.jpg";


	// uploading cover photo
	$user_profile_photo_dir = "../images/user_photo/";
	if (!empty($_FILES["profile_photo"]["name"])) {
		$profile_photo_file = $user_profile_photo_dir . basename($email . "_" . $_FILES["profile_photo"]["name"]);
		if (move_uploaded_file($_FILES["profile_photo"]["tmp_name"], $profile_photo_file)) {
			$profilePhoto = $email . "_" . $_FILES["profile_photo"]["name"];
			$saveProfileInfo = $DB->query("UPDATE `barber` SET `profilePhoto` = ? WHERE `userid` = ?", array($profilePhoto, $userId)); //Parameters must be ordered
		} else {
			echo "couldn't upload, might be permission issue!";
		}
	}

	// uploading cover photo
	$user_cover_photo_dir = "../images/user_cover_photo/";
	if (!empty($_FILES["cover_photo"]["name"])) {
		$cover_pic_file = $user_cover_photo_dir . basename($email . "_" . $_FILES["cover_photo"]["name"]);
		if (move_uploaded_file($_FILES["cover_photo"]["tmp_name"], $cover_pic_file)) {
			$coverPhoto = $email . "_" . $_FILES["cover_photo"]["name"];
			$saveProfileInfo = $DB->query("UPDATE `barber` SET `coverPhoto` = ? WHERE `userid` = ?", array($coverPhoto, $userId)); //Parameters must be ordered
		} else {
			echo "couldn't upload, might be permission issue!";
		}
	}

	$saveProfileInfo = $DB->query("UPDATE `barber` SET `description` = ? WHERE `userid` = ?", array($description, $userId)); //Parameters must be ordered
	$updateName = $DB->query("UPDATE `users` SET `name` = ? WHERE `email` = ?", array($fullname, $email)); //Parameters must be ordered

	if ($saveProfileInfo != false && $updateName != false) {
		echo "saved successfully";
	}
}

if (isset($_POST["submitChangeEmail"])) {

	$newEmail = $_POST["newEmail"];


	$updateEmail = $DB->query("UPDATE `users` SET `email` = ? WHERE `userid` = ?", array($newEmail, $userId)); //Parameters must be ordered


	if ($updateEmail != false) {
		echo "updated successfully";
	}
}


if (isset($_POST["submitChangePass"])) {

	$newPass = $_POST["newPassword"];


	$updatePass = $DB->query("UPDATE `users` SET `password` = ? WHERE `userid` = ?", array($newPass, $userId)); //Parameters must be ordered


	if ($updatePass != false) {
		echo "updated successfully";
	}
}

$getUserDetails = $DB->query("SELECT * FROM users WHERE email=?", array($email));
$getBarberDetails = $DB->query("SELECT * FROM barber WHERE userid=?", array($userId));

$getSchedule = $DB->query("SELECT * FROM schedule WHERE userid=?", array($userId));

$getPricelist = $DB->query("SELECT * FROM `cuttingtype` where userid=?", array($userId));

$getAddress = $DB->query("SELECT * FROM `address` where userid=?", array($userId));






include("work_photos_uploader.php");
$getWorkPhotos = $DB->query("SELECT * FROM workphotos WHERE userid=?", array($userId));
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Barber Panel</title>
	<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link media="all" rel="stylesheet" href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	<link media="all" rel="stylesheet" href="../css/main.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
	<script>
		window.jQuery || document.write('<script src="../js/jquery-3.3.1.min.js" defer><\/script>')
	</script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" defer></script>
	<link class="jsbin" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
	<script class="jsbin" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script class="jsbin" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js"></script>
	<script src="../js/jquery.main.js" defer></script>

	<style>
		.scheduleData {
			position: relative;
		}

		.checkSchedule {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0px;
			left: 0px;
			opacity: 0;
			cursor: pointer
		}

		.hideElem {
			visibility: hidden;
		}

		.showElem {
			visibility: visible;
		}

		.position-relative {
			position: relative;
		}

		.position-absolute {
			position: absolute;
		}

		.top-0 {
			top: 0px;
		}

		.left-0 {
			left: 0px;
		}

		.close-btn {
			position: absolute;
			top: 0px;
			right: 0px;
			background: none;
			background: red;
			border: none;
			padding: 3px 5px;
			visibility: hidden;
			color: white;
			opacity: 0.5;
		}

		.close-btn:hover {
			opacity: 1;
		}

		.slide:hover .close-btn {
			visibility: visible;
		}

		/* Set the size of the div element that contains the map */
		#map {
			height: 400px;
			/* The height is 400 pixels */
			width: 100%;
			/* The width is the width of the web page */
		}

		#infowindow-content .title {
			font-weight: bold;
		}

		#infowindow-content {
			display: none;
		}

		#map #infowindow-content {
			display: inline;
		}
	</style>


	<script>
		// This example requires the Places library. Include the libraries=places
		// parameter when you first load the API. For example:
		// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

		const componentForm = {
			// street_number: "short_name",
			// route: "long_name",
			locality: "long_name",
			// administrative_area_level_1: "short_name",
			// country: "long_name",
			postal_code: "short_name",


		};

		function initMap() {


			const lat_lan = {
				lat: <?php echo $getAddress[0]["lat"]
						?>,
				lng: <?php echo $getAddress[0]["lng"]
						?>
			};



			const map = new google.maps.Map(document.getElementById("map"), {
				center: lat_lan,
				zoom: 17,
			});
			const marker = new google.maps.Marker({
				position: lat_lan,
				map: map,
			});

			const card = document.getElementById("pac-card");
			const input = document.getElementById("pac-input");

			const options = {
				componentRestrictions: {
					country: "pk"
				},
				// fields: ["formatted_address", "geometry", "name"],
				// strictBounds: false,
				types: ["establishment"],
			};

			const autocomplete = new google.maps.places.Autocomplete(input, options);
			// Bind the map's bounds (viewport) property to the autocomplete object,
			// so that the autocomplete requests use the current map bounds for the
			// bounds option in the request.
			autocomplete.bindTo("bounds", map);
			const infowindow = new google.maps.InfoWindow();
			const infowindowContent = document.getElementById("infowindow-content");
			infowindow.setContent(infowindowContent);
			// const marker = new google.maps.Marker({
			// 	map,
			// 	anchorPoint: new google.maps.Point(0, -29),
			// });
			autocomplete.addListener("place_changed", () => {
				infowindow.close();
				marker.setVisible(false);
				const place = autocomplete.getPlace();

				if (!place.geometry || !place.geometry.location) {
					// User entered the name of a Place that was not suggested and
					// pressed the Enter key, or the Place Details request failed.
					window.alert("No details available for input: '" + place.name + "'");
					return;
				}

				// console.log(place);

				for (const component of place.address_components) {
					const addressType = component.types[0];

					if (componentForm[addressType]) {
						const val = component[componentForm[addressType]];

						console.log(addressType);
						console.log(val);

						componentForm[addressType] = val;
						// document.getElementById(addressType).value = val;
					}
				}



				// document.getElementById("lati").value = place.geometry.location.lat();
				// document.getElementById("lngt").value = place.geometry.location.lng();

				// If the place has a geometry, then present it on a map.
				if (place.geometry.viewport) {
					map.fitBounds(place.geometry.viewport);
				} else {
					map.setCenter(place.geometry.location);
					map.setZoom(17);
				}
				marker.setPosition(place.geometry.location);
				marker.setVisible(true);
				infowindowContent.children["place-name"].textContent = place.name;
				infowindowContent.children["place-address"].textContent =
					place.formatted_address;
				infowindow.open(map, marker);


				autocomplete.setTypes([]);

				autocomplete.bindTo("bounds", map);

				const addObj = {
					...componentForm,
					"address": input.value,
					"lat": place.geometry.location.lat(),
					"lng": place.geometry.location.lng()
				};
				saveAddress(addObj);

			});







		}

		function saveAddress(addressObj) {
			$.ajax({
				type: "POST",
				url: "save_address.php",
				data: addressObj,
				cache: false,
				success: function(data) {
					// $("#resultarea").text(data);
					console.log(data);
				}
			});
		}
	</script>






</head>

<body class="inner">
	<div id="wrapper">
		<?php include_once("includes/header.php"); ?>

		<input type="hidden" name="userid" id="myUserId" value="<?php echo $_SESSION['user_id']; ?>">
		<main id="main">
			<div class="container info-section pt-0">
				<div class="banner-holder" style="overflow: hidden;" class="position: relative;">
					<?php if ($getBarberDetails[0]['coverPhoto'] != null) { ?>
						<img style="width: 100%;" src="../images/user_cover_photo/<?php echo $getBarberDetails[0]['coverPhoto']; ?>" id="coverPhoto" alt="cover photo">
					<?php } else { ?>
						<img style="width: 100%;" src="../images/user_cover_photo/default_cover.jpg" id="coverPhoto" alt="cover photo">
					<?php } ?>
					<a style="cursor: pointer;" onclick="document.getElementById('cover_photo').click();" class="iconplus"><img src="../images/icon-plus.jpg" alt="Image Description"></a>
				</div>
				<div class="content-block inner">
					<aside class="sidebar">
						<h2 class="none"><a href="#" class="account-opener">menu</a></h2>
						<ul class="account-info info-list slide tabset">
							<li><a href="#section1" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-user.png" alt="img description">
									</div>
									Account
								</a></li>
							<li><a href="#section3" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-photo.png" width="31" height="33" alt="img description">
									</div>
									Work Photos
								</a></li>
							<li><a href="#section4" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-cart.png" width="31" height="33" alt="img description">
									</div>
									Sell your services
								</a></li>
							<li><a href="#section5" class="down notification">
									<div class="icon-box">
										<span>2</span>
										<img class="icon img-alert" src="../images/icon-alert.png" width="50" height="39" alt="img description">
									</div>
									Incoming Requests
								</a></li>
							<li><a href="#section6" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/img-block.png" width="32" height="32" alt="img description">
									</div>
									Services Performed
								</a></li>
							<li><a href="#section7" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-list.png" width="26" height="33" alt="img description">
									</div>
									Price List
								</a></li>

							<li><a href="#section8" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-reviews.png" width="32" height="28" alt="img description">
									</div>
									Reviews
								</a></li>

							<li><a href="#section9" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-map.png" width="33" height="37" alt="img description">
									</div>
									Map
								</a></li>

							<li><a href="#section12" class="down">
									<div class="icon-box">
										<img class="icon" src="../images/icon-price.png" width="36" height="41" alt="img description">
									</div>
									Payments
								</a></li>
							<li><a href="#section10" class="down">
									<div class="icon-box">
										<img class="icon img-alert" src="../images/icon-setting.png" width="33" height="34" alt="img description">
									</div>
									Settings
								</a></li>
							<li><a href="#section11" class="down">
									<div class="icon-box">
										<img class="icon img-alert" src="../images/img-photo.jpg" width="33" height="34" alt="img description">
									</div>
									Tax Profile
								</a></li>
						</ul>
					</aside>
					<div class="right-content">
						<div class="center-content visible tab-content no-hscroll has-banner new-scroll">
							<form id="section1" action="" method="POST" enctype="multipart/form-data" class="info-block tab">
								<div class="header no-border">
									<div class="user-col">
										<div class="text">Profile picture </div>
										<label class="img-box" style="position: relative; cursor: pointer;" for="profile_photo">
											<?php if ($getBarberDetails[0]['profilePhoto'] != null) { ?>
												<img src="../images/user_photo/<?php echo $getBarberDetails[0]['profilePhoto']; ?>" width="122" height="138" alt="img description" id="profilePhoto">
											<?php } else { ?>
												<img src="../images/user_photo/default_photo.jpg" width="122" height="138" alt="Photo" id="profilePhoto">
											<?php } ?>

											<a class="iconplus"><img src="../images/icon-plus.jpg" alt="Image Description"></a>
											<input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" name="profile_photo" id="profile_photo" style="position: absolute; visibility: hidden;" onchange="readURL(this,'profilePhoto');">
											<input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" name="cover_photo" id="cover_photo" style="position: absolute; visibility: hidden;" onchange="readURL(this,'coverPhoto');">
										</label>
										<div class="text-box">
											<strong class="title">
												<input type="text" placeholder="Name or Artistic name" name="fullname" value="<?php if ($getUserDetails != null) echo $getUserDetails[0]['name']; ?>" required>
											</strong>
											<ul class="star-rating">
												<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
												<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
												<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
												<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
												<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
												<li>348</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="heading-holder">
									<div class="icon-box">
										<img src="../images/icon-info.png" width="14" height="31" alt="img description" class="info-icon">
									</div>
									<strong class="heading">Info</strong>
								</div>
								<textarea class="text-area-dashed" name="description" required><?php if ($getBarberDetails != null) echo $getBarberDetails[0]['description']; ?></textarea>
								<div class="info-submit">
									<button type="submit" class="btn" name="save_profile_info">SAVE</button>
								</div>
							</form>
							<div class="photo-work inner tab" id="section3">
								<div class="heading-holder">
									<div class="icon-box">
										<img src="../images/icon-photo.png" width="31" height="31" alt="img description">
									</div>
									<strong class="heading">Foto Lavori</strong>
								</div>
								<div class="photo-list inner">
									<form class="slide" method="post" action="" enctype="multipart/form-data">
										<label for="upload">
											<input type="file" id="upload" name="fileUpload[]" onchange="document.getElementById('submit-work-photos').click();" accept="image/png, image/jpeg, image/jpg" class="upload-files" multiple>
											<img src="../images/img-upload.jpg" alt="Image Description">
											<input type="submit" name="submit-work-photos" id='submit-work-photos' style="position: absolute; visibility: hidden;">
										</label>
									</form>
									<?php if ($getWorkPhotos != null) {
										foreach ($getWorkPhotos as $photo) {
											$formId = 'deleteForm' . $photo['photoId']; ?>

											<form id="<?php echo $formId; ?>" class="slide position-relative" method="POST" onsubmit="deletePhoto('<?php echo $formId; ?>'); return false;"> <input type="hidden" name="photoid" value="<?php echo $photo['photoId']; ?>"> <button type="submit" class="close-btn">X</button> <a href="#"><img src="../images/work_photos/<?php echo $photo['photo']; ?>" alt="wp"></a></form>
									<?php }
									} ?>

								</div>
							</div>
							<div class="services-block tab" id="section4">
								<div class="heading-holder mb-5">
									<div class="icon-box">
										<img src="../images/cart-img.png" width="58" height="52" alt="img description">
									</div>
									<strong class="heading">Sell your services</strong>
								</div>
								<p class="sub_text">(Choose the day and time to work)</p>
								<div class="table-holder">
									<!--<strong class="title">June 2020 </strong>-->
									<div class="table-wrap">
										<table class="table">

											<tbody>
												<tr>
													<td><span class="text border-0">Monday</span></td>
													<td data-date="12 Monday" data-time="7.00" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this); ">
													</td>

													<td data-date="12 Monday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="12 Monday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="12 Monday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="12 Monday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="12 Monday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="12 Monday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="12 Monday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '12 Monday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>
												<tr>
													<td>
														<span class="border-0">Tuesday</span>
													</td>
													<td data-date="13 Tuesday" data-time="7.00" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="13 Tuesday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '13 Tuesday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>
												<tr>
													<td>
														<span class=" border-0">Wednesday</span>
													</td>
													<td data-date="14 Wednesday" data-time="7.00" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="14 Wednesday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '14 Wednesday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>
												<tr>
													<td>
														<span class="border-0">Thursday</span>
													</td>
													<td data-date="15 Thursday" data-time="7.00" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="15 Thursday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '15 Thursday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>
												<tr>
													<td>
														<span class="text border-0">Friday</span>
													</td>
													<td data-date="16 Friday" data-time="8.30" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">

													</td>
													<td data-date="16 Friday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">

													</td>
													<td data-date="16 Friday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">

													</td>
													<td data-date="16 Friday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">

													</td>
													<td data-date="16 Friday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="16 Friday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="16 Friday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="16 Friday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '16 Friday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>
												<tr>
													<td>
														<span class="border-0">Saturday</span>
													</td>
													<td data-date="17 Saturday" data-time="7.00" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="17 Saturday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '17 Saturday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>
												<tr>
													<td><span class="border-0">Sunday</span></td>
													<td data-date="18 Sunday" data-time="7.00" class="scheduleData">
														<span class="text">7.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '7.00' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="8.30" class="scheduleData">
														<span class="text">8.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '8.30' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="10.00" class="scheduleData">
														<span class="text">10.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '10.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="11.00" class="scheduleData">
														<span class="text">11.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '11.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="12.00" class="scheduleData">
														<span class="text">12.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '12.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="13.30" class="scheduleData">
														<span class="text">13.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '13.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="15.00" class="scheduleData">
														<span class="text">15.00</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '15.0' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
													<td data-date="18 Sunday" data-time="16.30" class="scheduleData">
														<span class="text">16.30</span>
														<div class="icon-box" style="visibility: <?php
																									$flag1 = false;
																									foreach ($getSchedule as $value) {
																										if ($value['date'] == '18 Sunday' && $value['time'] == '16.3' && $value['availability'] == '1') {
																											$flag1 = true;
																											break;
																										} else {
																											$flag1 = false;
																										}
																									}
																									if ($flag1) {
																										echo 'visible';
																									} else {
																										echo 'hidden';
																									}
																									?> "><img src="../images/cart-img.png" width="35" height="37" alt="img description"></div>
														<input type="checkbox" name="availability" class="checkSchedule" onclick="toogleCart(this);">
													</td>
												</tr>

											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="info-block tab" id="section5">
								<div class="heading-holder">
									<div class="icon-box notification">
										<img width="50" height="39" alt="img description" src="../images/icon-alert.png">
									</div>
									<strong class="heading">Richieste in arrivo</strong>
								</div>
								<div class="detail-data inner">
									<dl>
										<dt class="active"><span class="num">1</span> Nome :</dt>
										<dd>Francesco</dd>
										<dt>Indirizzo, N.civico : </dt>
										<dd>Via le mani dagli occhi, 34</dd>
										<dt>Citofono :</dt>
										<dd>Spanfulla</dd>
										<dt>Interno Scala:</dt>
										<dd>1 , H</dd>
										<dt>Citta , Cap:</dt>
										<dd>Roma , 00255</dd>
										<dt>Giorno, Data :</dt>
										<dd>Venerdi, 23/05/2020</dd>
										<dt class="indent">ora :</dt>
										<dd class="indent">10.30</dd>

										<dt>Servizio taglio :</dt>
										<dd>10€</dd>

										<dt>Servizio taglio + barba :</dt>
										<dd>5€</dd>

										<dt class="indent">Servizio taglio bambino :</dt>
										<dd class="indent">10€</dd>

										<dt class="indent">Totale servizio</dt>
										<dd class="indent">25€</dd>

										<dt>Durata servizio</dt>
										<dd>60 minuti</dd>
									</dl>
									<a href="#" class="link-middle">Prossimo servizio</a>
								</div>
								<div class="detail-data inner">
									<dl>
										<dt>Nome :</dt>
										<dd>Francesco</dd>
										<dt>Indirizzo, N.civico : </dt>
										<dd>Via le mani dagli occhi, 34</dd>
										<dt>Citofono :</dt>
										<dd>Spanfulla</dd>
										<dt>Interno Scala:</dt>
										<dd>1 , H</dd>
										<dt>Citta , Cap:</dt>
										<dd>Roma , 00255</dd>
										<dt>Giorno, Data :</dt>
										<dd>Venerdi, 23/05/2020</dd>
										<dt class="indent">ora :</dt>
										<dd class="indent">10.30</dd>

										<dt>Servizio taglio :</dt>
										<dd>10€</dd>

										<dt>Servizio taglio + barba :</dt>
										<dd>5€</dd>

										<dt class="indent">Servizio taglio bambino :</dt>
										<dd class="indent">10€</dd>

										<dt class="indent">Totale servizio</dt>
										<dd class="indent">25€</dd>

										<dt>Durata servizio</dt>
										<dd>60 minuti</dd>
									</dl>
									<a href="#" class="link-middle">Prossimo servizio</a>
								</div>
								<div class="detail-data inner">
									<dl>
										<dt>Nome :</dt>
										<dd>Francesco</dd>
										<dt>Indirizzo, N.civico : </dt>
										<dd>Via le mani dagli occhi, 34</dd>
										<dt>Citofono :</dt>
										<dd>Spanfulla</dd>
										<dt>Interno Scala:</dt>
										<dd>1 , H</dd>
										<dt>Citta , Cap:</dt>
										<dd>Roma , 00255</dd>
										<dt>Giorno, Data :</dt>
										<dd>Venerdi, 23/05/2020</dd>
										<dt class="indent">ora :</dt>
										<dd class="indent">10.30</dd>

										<dt>Servizio taglio :</dt>
										<dd>10€</dd>

										<dt>Servizio taglio + barba :</dt>
										<dd>5€</dd>

										<dt class="indent">Servizio taglio bambino :</dt>
										<dd class="indent">10€</dd>

										<dt class="indent">Totale servizio</dt>
										<dd class="indent">25€</dd>

										<dt>Durata servizio</dt>
										<dd>60 minuti</dd>
									</dl>
									<a href="#" class="link-middle">Prossimo servizio</a>
								</div>
							</div>
							<div class="info-block tab" id="section6">
								<div class="heading-holder">
									<div class="icon-box notification">
										<img width="50" height="39" alt="img description" src="../images/img-block.png">
									</div>
									<strong class="heading">Servizi effettuati</strong>
								</div>
								<!--
								<div class="detail-data servizi inner">
									<dl>
										<dt class="active">Nome e Cognome :</dt>
										<dd>Mario Antomni</dd>
										<dt>Indrizzo, Citta', Cap :</dt>
										<dd>Via le mani, Roma , 00156</dd>
										<dt>Citofono :</dt>
										<dd>Pallino</dd>
										<dt>Interno Scala:</dt>
										<dd>Interno 2, scala H</dd>
										<dt>Metodo di Pagamento:</dt>
										<dd>Mastercard che termina con le cifre 4548</dd>
										<dt>Data, Оra:</dt>
										<dd>21/07/20, 17.30</dd>
										<dt>Tot. servizio :</dt>
										<dd>euro 20,00</dd>
									</dl>
									<a href="#" class="link-middle">Prossimo servizio</a>
								</div>
								<div class="detail-data servizi inner">
									<dl>
										<dt class="active">Nome e Cognome :</dt>
										<dd>Mario Antomni</dd>
										<dt>Indrizzo, Citta', Cap :</dt>
										<dd>Via le mani, Roma , 00156</dd>
										<dt>Citofono :</dt>
										<dd>Pallino</dd>
										<dt>Interno Scala:</dt>
										<dd>Interno 2, scala H</dd>
										<dt>Metodo di Pagamento:</dt>
										<dd>Mastercard che termina con le cifre 4548</dd>
										<dt>Data, Оra:</dt>
										<dd>21/07/20, 17.30</dd>
										<dt>Tot. servizio :</dt>
										<dd>euro 20,00</dd>
									</dl>
									<a href="#" class="link-middle">Prossimo servizio</a>
								</div>
								<div class="detail-data servizi inner">
									<dl>
										<dt class="active">Nome e Cognome :</dt>
										<dd>Mario Antomni</dd>
										<dt>Indrizzo, Citta', Cap :</dt>
										<dd>Via le mani, Roma , 00156</dd>
										<dt>Citofono :</dt>
										<dd>Pallino</dd>
										<dt>Interno Scala:</dt>
										<dd>Interno 2, scala H</dd>
										<dt>Metodo di Pagamento:</dt>
										<dd>Mastercard che termina con le cifre 4548</dd>
										<dt>Data, Оra:</dt>
										<dd>21/07/20, 17.30</dd>
										<dt>Tot. servizio :</dt>
										<dd>euro 20,00</dd>
									</dl>
									<a href="#" class="link-middle">Prossimo servizio</a>
								</div>-->
								<div class="detail-data servizi inner">
									<dl>
										<dt> Nome :</dt>
										<dd>Francesco</dd>
										<dt>Indirizzo, N.civico : </dt>
										<dd>Via le mani dagli occhi, 34</dd>
										<dt>Citofono :</dt>
										<dd>Spanfulla</dd>
										<dt>Interno Scala:</dt>
										<dd>1 , H</dd>
										<dt>Citta , Cap:</dt>
										<dd>Roma , 00255</dd>
										<dt>Giorno, Data :</dt>
										<dd>Venerdi, 23/05/2020</dd>
										<dt class="indent">ora :</dt>
										<dd class="indent">10.30</dd>

										<dt>Servizio taglio :</dt>
										<dd>10€</dd>

										<dt>Servizio taglio + Barba :</dt>
										<dd>5€</dd>

										<dt class="indent">Servizio taglio bambino :</dt>
										<dd class="indent">10€</dd>

										<dt class="indent">Totale servizio</dt>
										<dd class="indent">25€</dd>

										<dt>Durata servizio</dt>
										<dd>60 minuti</dd>
									</dl>
									<a href="#" class="link-middle">Ultimo servizio</a>
								</div>
								<div class="detail-data servizi inner">
									<dl>
										<dt>Nome :</dt>
										<dd>Francesco</dd>
										<dt>Indirizzo, N.civico : </dt>
										<dd>Via le mani dagli occhi, 34</dd>
										<dt>Citofono :</dt>
										<dd>Spanfulla</dd>
										<dt>Interno Scala:</dt>
										<dd>1 , H</dd>
										<dt>Citta , Cap:</dt>
										<dd>Roma , 00255</dd>
										<dt>Giorno, Data :</dt>
										<dd>Venerdi, 23/05/2020</dd>
										<dt class="indent">ora :</dt>
										<dd class="indent">10.30</dd>

										<dt>Servizio taglio :</dt>
										<dd>10€</dd>

										<dt>Servizio taglio + Barba :</dt>
										<dd>5€</dd>

										<dt class="indent">Servizio taglio bambino :</dt>
										<dd class="indent">10€</dd>

										<dt class="indent">Totale servizio</dt>
										<dd class="indent">25€</dd>

										<dt>Durata servizio</dt>
										<dd>60 minuti</dd>
									</dl>
									<a href="#" class="link-middle">Ultimo servizio</a>
								</div>
								<div class="detail-data servizi inner">
									<dl>
										<dt>Nome :</dt>
										<dd>Francesco</dd>
										<dt>Indirizzo, N.civico : </dt>
										<dd>Via le mani dagli occhi, 34</dd>
										<dt>Citofono :</dt>
										<dd>Spanfulla</dd>
										<dt>Interno Scala:</dt>
										<dd>1 , H</dd>
										<dt>Citta , Cap:</dt>
										<dd>Roma , 00255</dd>
										<dt>Giorno, Data :</dt>
										<dd>Venerdi, 23/05/2020</dd>
										<dt class="indent">ora :</dt>
										<dd class="indent">10.30</dd>

										<dt>Servizio taglio :</dt>
										<dd>10€</dd>

										<dt>Servizio taglio + Barba :</dt>
										<dd>5€</dd>

										<dt class="indent">Servizio taglio bambino :</dt>
										<dd class="indent">10€</dd>

										<dt class="indent">Totale servizio</dt>
										<dd class="indent">25€</dd>

										<dt>Durata servizio</dt>
										<dd>60 minuti</dd>
									</dl>
									<a href="#" class="link-middle">Ultimo servizio</a>
								</div>
							</div>
							<div class="price-block info-block tab" id="section7">
								<div class="heading-holder mb-5">
									<div class="icon-box">
										<img src="../images/icon-list.png" width="26" height="33" alt="img description">
									</div>
									<strong class="heading">Price list</strong>
								</div>
								<p>(The price will be unchanged regardless of the distance of the service)</p>
								<ul class="price-list inner">
									<li>
										<!-- <form action="" method="POST" onsubmit="console.log('Testing..!'); return false;"> -->
										<?php
										$p1 = "";
										$p2 = "";
										$p3 = "";

										$d1 = "";
										$d2 = "";
										$d3 = "";
										$check1 = "";
										$check2 = "";
										$check3 = "";

										if ($getPricelist != null) {
											foreach ($getPricelist as $key) {
												if ($key['type'] == "CUTTING SERVICE") {
													$p1 = $key['price'];
													$d1 = $key['duration'];
													$check1 = $key['availability'];
												}
												if ($key['type'] == "CUT + BEARD SERVICE") {
													$p2 = $key['price'];
													$d2 = $key['duration'];
													$check2 = $key['availability'];
												}
												if ($key['type'] == "BABY CUT SERVICE") {
													$p3 = $key['price'];
													$d3 = $key['duration'];
													$check3 = $key['availability'];
												}
											}
										}
										?>
										<div class="text">
											<div class="text-holder">
												<div class="text-title">
													<span>CUTTING SERVICE</span>
												</div>
												<div class="input-text">
													<div class="input-holder">
														<input type="number" placeholder="15" class="input-control" name="c1" id="c1" value="<?php echo $p1 ?>">
													</div>
													<strong>euro</strong>
												</div>
											</div>
											<div class="text-holder">
												<div class="text-title">
													<span>SERVICE DURATION</span>
												</div>
												<div class="input-text">
													<div class="input-holder">
														<input type="text" placeholder="60" class="input-control" name="d1" id="d1" value="60" readonly>
													</div>
													<strong>minutes</strong>
												</div>
											</div>
										</div>
										<div class="label-area">
											<!-- Rounded switch -->
											<label class="switch">
												<?php
												if ($check1 == 0) { ?>
													<input type="checkbox" name="a1" id="a1" checked>
												<?php } else { ?>
													<input type="checkbox" name="a1" id="a1">
												<?php } ?>

												<span class="switch-slider round"></span>
												<div class="note">
													The service will not be available in sales
												</div>
											</label>
											<a href="#" class="btn" onclick="updatePriceList('type1','c1','d1', 'a1', '<?php echo $_SESSION['user_id']; ?>');">Save</a>
										</div>

										<!-- </form> -->
									</li>
									<li>
										<div class="text">
											<div class="text-holder">
												<div class="text-title">
													<span>servizio taglio + barba</span>
												</div>
												<div class="input-text">
													<div class="input-holder">
														<input type="number" placeholder="15" class="input-control" name="c2" id="c2" value="<?php echo $p2 ?>">
													</div>
													<strong>euro</strong>
												</div>
											</div>
											<div class="text-holder">
												<div class="text-title">
													<span>SERVICE DURATION</span>
												</div>
												<div class="input-text">
													<div class="input-holder">
														<input type="text" placeholder="60" class="input-control" name="d2" id="d2" value="60" readonly>
													</div>
													<strong>minutes</strong>
												</div>
											</div>
										</div>
										<div class="label-area">
											<!-- Rounded switch -->
											<label class="switch">
												<?php
												if ($check2 == 0) { ?>
													<input type="checkbox" name="a2" id="a2" checked>
												<?php } else { ?>
													<input type="checkbox" name="a2" id="a2">
												<?php } ?>
												<span class="switch-slider round"></span>
												<div class="note">
													The service will not be available in sales
												</div>
											</label>
											<a href="#" class="btn" onclick="updatePriceList('type2','c2','d2', 'a2', '<?php echo $_SESSION['user_id']; ?>');">Save</a>
										</div>
									</li>
									<li>
										<div class="text">
											<div class="text-holder">
												<div class="text-title">
													<span>servizio taglio bambino</span>
												</div>
												<div class="input-text">
													<div class="input-holder">
														<input type="number" placeholder="15" class="input-control" name="c3" id="c3" value="<?php echo $p3 ?>">
													</div>
													<strong>euro</strong>
												</div>
											</div>
											<div class="text-holder">
												<div class="text-title">
													<span>SERVICE DURATION</span>
												</div>
												<div class="input-text">
													<div class="input-holder">
														<input type="text" placeholder="60" class="input-control" name="d3" id="d3" value="60" readonly>
													</div>
													<strong>minutes</strong>
												</div>
											</div>
										</div>
										<div class="label-area">
											<!-- Rounded switch -->
											<label class="switch">
												<?php
												if ($check3 == 0) { ?>
													<input type="checkbox" name="a3" id="a3" checked>
												<?php } else { ?>
													<input type="checkbox" name="a3" id="a3">
												<?php } ?>
												<span class="switch-slider round"></span>
												<div class="note">
													The service will not be available in sales
												</div>
											</label>
											<a href="#" class="btn" onclick="updatePriceList('type3','c3','d3', 'a3', '<?php echo $_SESSION['user_id']; ?>');">Save</a>
										</div>
									</li>
								</ul>
							</div>
							<div id="section8" class="reviews-block info-block tab">
								<div class="heading-holder">
									<div class="icon-box">
										<img src="../images/icon-reviews.png" width="32" height="28" alt="img description">
									</div>
									<strong class="heading">Recensioni </strong>
								</div>
								<div class="review-holder">
									<strong class="title">EMANUELA SPAROZZI</strong>
									<ul class="star-rating">
										<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star2.png" width="16" height="16" alt="img description"></li>
									</ul>
									<p>Puntualità e professionalità, consiglierò JustCut sicuramente alle mie amiche.</p>
								</div>
								<div class="review-holder">
									<strong class="title">MARIO BREGA</strong>
									<ul class="star-rating">
										<li><img src="../images/icon-star.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star2.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star2.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star2.png" width="16" height="16" alt="img description"></li>
										<li><img src="../images/icon-star2.png" width="16" height="16" alt="img description"></li>
									</ul>
									<p>Il servizio fa schifo, il barbiere è poco professionale.</p>
								</div>
							</div>
							<div id="section9" class="info-block tab">
								<div class="heading-holder">
									<div class="icon-box">
										<img src="../images/icon-map.png" alt="img description">

									</div>
									<strong class="heading">Map </strong>
								</div>
								<div class="map-bar">
									<div class="col">
										<div class="radius-away">
											<strong class="title">Radius</strong>
											<div class="range-slider-wrapper">
												<!-- <div class="slider" data-min="0" data-max="10" data-value="3" id="radius"  data-step="1"></div> -->

												<input type="range" class="form-control" min="0" max="10" value="<?php echo $getAddress[0]["radius"] ?>" name="radius" onchange="changeRadius()" class="slider" id="radius">
											</div>
											<ul class="km-list">
												<li>1 km</li>
												<li>5 km</li>
												<li>10 km</li>
											</ul>
										</div>
									</div>
									<div class="col" id="pac-card">
										<div class="input-flex">
											<div class="input">
												<strong class="title">Address where you want to work</strong>
												<input type="text" class="input-control" id="pac-input" value="<?php echo $getAddress[0]["address"] ?>">
											</div>
											<div class="input">
												<div class="dropdown">
													<a href="#" class="sort-opener">Sort by</a>
													<div class="drop">
														<input type="radio" id="effettuati" name="sort">
														<label for="effettuati">

															Services performed
														</label>
														<input type="radio" id="arrivo" name="sort">
														<label for="arrivo">
															Incoming requests
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="map-placheolder">
									<!-- <img src="../images/map-placeholder.jpg" alt="Image description"> -->
									<div id="map"></div>
									<div id="infowindow-content">
										<span id="place-name" class="title"></span>
										<br>
										<span id="place-address"></span>
									</div>
								</div>
							</div>
							<div id="section10" class="info-block tab">
								<div class="heading-holder">
									<div class="icon-box">
										<img src="../images/icon-setting.png" alt="img description">
									</div>
									<strong class="heading">Settings </strong>
								</div>
								<div class="info-cols">
									<div class="col">
										<form action="" id="changeEmailForm" method="POST">
											<div class="input">
												<strong class="title">Edit email</strong>
												<input type="email" class="input-control" name="oldEmail" placeholder="Current email">
											</div>
											<div class="input">
												<input type="email" class="input-control" name="newEmail" placeholder="New email">
											</div>
											<div class="input">
												<button type="submit" class="btn" name="submitChangeEmail">Save</button>
											</div>
										</form>

										<form action="" id="changePassForm" method="POST">
											<div class="input">
												<strong class="title">Change Password</strong>
												<input type="password" class="input-control" name="oldPassword" id="oldPassword" placeholder="Current Password">
											</div>
											<div class="input">
												<input type="password" class="input-control" name="newPassword" id="newPassword" placeholder="New Password">
											</div>
											<div class="input">
												<input type="password" class="input-control" name="cPassword" placeholder="Confirm new password">
											</div>
											<div class="input">
												<button type="submit" class="btn" name="submitChangePass">Save</button>
											</div>
										</form>
									</div>
									<form action="" method="POST" class="col">
										<p><strong>Do you want to deactivate your Just Cut account? <br> <a style="cursor:pointer;" onclick="document.getElementById('submitDeactivateAccount').click();">Deactivate my account</a> </strong></p>
										<input type="submit" id="submitDeactivateAccount" name="submitDeactivateAccount" style="position: absolute; visibility: hidden;">
									</form>
								</div>
							</div>
							<div id="section12" class="info-block tab">

							</div>
							<div class="info-block tab" id="section11">
								<div class="heading-holder">
									<div class="icon-box">
										<img src="../images/img-photo.jpg" alt="img description" class="info-icon large">
									</div>
									<strong class="heading">Profilo Fiscale</strong>
								</div>
								<div class="profile-holder">
									<div class="input">
										<label for="Nome">Nome</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Nome" placeholder="AbramoZaccaria">
										</div>
									</div>
									<div class="input">
										<label for="Cognome">Cognome</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Cognome" placeholder="Abramo">
										</div>
									</div>
									<div class="input">
										<label for="Data">Data di nascita</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Data" placeholder="26/07/1993">
										</div>
									</div>
									<div class="input">
										<label for="Indirizzo">Indirizzo</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Indirizzo" placeholder="Via resella 23">
										</div>
									</div>
									<div class="input">
										<label for="Citta">Citta</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Citta" placeholder="Roma">
										</div>
									</div>
									<div class="input">
										<label for="CAP">CAP</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="CAP" placeholder="00154">
										</div>
									</div>
									<div class="input">
										<label for="Codice">Codice fiscale</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Codice" placeholder="BRMZCC15H501H">
										</div>
									</div>
									<div class="input">
										<label for="tel">Telefono</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="tel" placeholder="325847695">
										</div>
									</div>
									<div class="input">
										<label for="Professione">Professione</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Professione">
										</div>
									</div>
									<div class="input">
										<label for="Partita">Partita iva</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="Partita" placeholder="012345">
										</div>
									</div>
									<div class="input">
										<label for="destinatario">Codice destinatario</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="destinatario" placeholder="BRMZCC15H501H">
										</div>
										<!--
									<div class="input">
										<label for="destinatario">Codice destinatario</label>
										<div class="input-holder">
											<input type="text" class="input-control" id="destinatario">
										</div>
									</div>-->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</main>
	</div>
	<div class="popup-holder">
		<div class="popup">
			<form class="popup-content" action="#">
				<div class="head">
					<strong class="heading">Servizi</strong>
					<a class="btn-close" href="#">X</a>
				</div>
				<ul class="list">
					<li>
						<div class="text-box">
							<div class="icon-box">
								<img src="../images/icon-img01.png" width="41" height="42" alt="img description">
							</div>
							<span class="text">Servizio taglio </span>
						</div>
						<div class="input-box">
							<input type="number" min="0" value="1">
						</div>
					</li>
					<li>
						<div class="text-box">
							<div class="icon-box">
								<img src="../images/icon-img02.png" width="30" height="30" alt="img description">
							</div>
							<span class="text">Servizio Barba</span>
						</div>
						<div class="input-box">
							<input type="number" min="0" value="1">
						</div>
					</li>
					<li>
						<div class="text-box">
							<div class="icon-box">
								<img src="../images/icon-img03.png" width="28" height="28" alt="img description">
							</div>
							<span class="text">Servizio taglio bambino</span>
						</div>
						<div class="input-box">
							<input type="number" min="0" value="1">
						</div>
					</li>
				</ul>
				<p>Max 2 persone. Altrimenti prenotarsi nell’ orario seguente messo a disposizione dal barbiere</p>
				<div class="btn-holder">
					<button type="submit" class="btn">AGGIUNGI AL CARRELLO</button>
				</div>
			</form>
		</div>
	</div>




	<!-- <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAj9usER0ugIW7lhWuU7NKDEq_gtNM0-zQ&callback=initAutocomplete&libraries=places&v=weekly" async></script> -->

	<!-- <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"> -->

		<!-- <script src="../js/jquery-3.3.1.min.js"></script> -->

		<script src="../js/jquery.validate.min.js"></script>


	<script>
		function changeRadius() {

			const radius = document.getElementById("radius").value;

			console.log(radius);

			$.ajax({
				type: "POST",
				url: "change_radius.php",
				data: {
					radius: radius
				},
				cache: false,
				success: function(data) {
					// $("#resultarea").text(data);
					console.log(data);
				}
			});
		}

		function toogleCart(elem) {
			if ($(elem).is(':checked')) {
				$(elem).prev().css('visibility', 'visible');
				toggleAvailability(getTime(elem), getDate(elem), 1);
			} else {
				$(elem).prev().css('visibility', 'hidden');
				toggleAvailability(getTime(elem), getDate(elem), -1);
			}
		}

		function getDate(elem) {
			return elem.parentElement.dataset.date;
		}

		function getTime(elem) {
			return elem.parentElement.dataset.time;
		}

		function readURL(input, elemId) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function(e) {
					$('#' + elemId)
						.attr('src', e.target.result)
				};
				reader.readAsDataURL(input.files[0]);
			}
		}


		function toggleAvailability(myTime, myDate, checkValue) {
			var request = new XMLHttpRequest();
			request.open("POST", "set_availability.php");
			// Retrieving the form data
			var formData = new FormData();
			formData.set("mytime", myTime);
			formData.set("mydate", myDate);
			formData.set("checkvalue", checkValue);
			formData.set("userid", document.getElementById('myUserId').value);
			request.send(formData);
			request.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var response = this.responseText;

					console.log(response);

				}
			};
		}

		function deletePhoto(formId) {
			var request = new XMLHttpRequest();
			request.open("POST", "delete_work_photo.php");
			// Retrieving the form data
			var myForm = document.getElementById(formId);
			var formData = new FormData(myForm);
			request.send(formData);
			request.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var response = this.responseText;
					// console.log(response);
					document.getElementById(formId).style.display = 'none';
				}
			};
		}

		function updatePriceList(t, c, d, a, userid) {

			var type = "";
			var cost = document.getElementById(c);
			var duration = document.getElementById(d);
			var availability = document.getElementById(a);
			var av = 1;
			if (availability.checked) {
				av = -1;
			}
			if (t == "type1") {
				type = "CUTTING SERVICE";
			} else if (t == "type2") {
				type = "CUT + BEARD SERVICE";
			} else {
				type = "BABY CUT SERVICE";
			}

			// return;
			if (cost.value != "" && duration.value != "") {
				var request = new XMLHttpRequest();
				request.open("POST", "update_pricelist.php");
				// Retrieving the form data

				var formData = new FormData();
				formData.set("type", type);
				formData.set("cost", cost.value);
				formData.set("duration", duration.value);
				formData.set("availability", av);
				formData.set("userid", userid);
				request.send(formData);
				request.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var response = this.responseText;

						console.log(response);

					}
				};
			} else {
				alert("Please enter price and duration values");
			}

		}
	





		$("#changeEmailForm").validate({
			rules: {
				oldEmail: {
					required: true,
					remote: {
						url: "includes/ajax_functions.php",
						type: "post",
						data: {
							functionName: "check_old_email",
							email: function() {
								return $("input[name=\"oldEmail\"]").val()
							},
							barber_id: <?php echo $userId; ?>
						}
					}
				},
				newEmail: {
					required: true,
					remote: {
						url: "includes/ajax_functions.php",
						type: "post",
						data: {
							functionName: "check_new_email",
							email: function() {
								return $("input[name=\"newEmail\"]").val()
							},
							barber_id: <?php echo $userId; ?>
						}
					}
				}
			},
			messages: {
				oldEmail: {
					required: "Please enter your current email",
					email: "Invalid Email"
				},
				newEmail: {
					required: "Please enter your new email",
					email: "Invalid Email"
				},

			},

			errorPlacement: function(error, element) {
				error.insertAfter(element);
			},

			errorElement: "div"
		})

		$("#changePassForm").validate({
			rules: {

				oldPassword: {
					required: true,
					remote: {
						url: "includes/ajax_functions.php",
						type: "post",
						data: {
							functionName: "check_old_password",
							newPassword: function() {
								return $("#oldPassword").val()
							},
							barber_id: <?php echo $userId; ?>
						}
					}
				},
				newPassword: {
					required: true,
					remote: {
						url: "includes/ajax_functions.php",
						type: "post",
						data: {
							functionName: "check_password_strength",
							newPassword: function() {
								return $("#newPassword").val()
							}
						}
					}
				},
				cPassword: {
					required: true,
					equalTo: "#newPassword"
				}
			},
			messages: {

				oldPassword: {
					required: "Please enter your current password"
				},
				newPassword: {
					required: "Please enter your new password"
				},
				cPassword: {
					required: "Please confirm your password",
					equalTo: "Password does not match"
				},
			},

			errorPlacement: function(error, element) {
				error.insertAfter(element);
			},

			errorElement: "div"
		})
	</script>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAj9usER0ugIW7lhWuU7NKDEq_gtNM0-zQ&callback=initMap&libraries=places&v=weekly" async></script>

</body>

</html>