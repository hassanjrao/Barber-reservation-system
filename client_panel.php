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


if (isset($_POST["submit"])) {

	
	$name = $_POST["name"];
	$email = $_POST["email"];
	$password = $_POST["password"];

	$phone = $_POST["phone"];


	$updateEmail = $DB->query("UPDATE `users` SET `name`=?,`email` = ?,`password`=? WHERE `userid` = ?", array($name,$email,$password, $userId)); //Parameters must be ordered

	$saveVisitorInfo = $DB->query("UPDATE `visitor` SET `phone` = ? WHERE `userid` = ?", array($phone, $userId)); //Parameters must be ordered
	

	if ($updateEmail != false && $saveVisitorInfo !=false) {
		echo "updated successfully";
	}
}


$getUserDetails = $DB->query("SELECT * FROM users WHERE userid=?", array($userId));
$getVisitorDetails = $DB->query("SELECT * FROM visitor WHERE userid=?", array($userId));




?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Panel</title>
	<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap" rel="stylesheet">
	<link media="all" rel="stylesheet" href="css/main.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
	<script>
		window.jQuery || document.write('<script src="js/jquery-3.3.1.min.js" defer><\/script>')
	</script>
	<script src="js/jquery.main.js" defer></script>
</head>

<body class="has-bg">
	<div id="wrapper">
		<?php
		include_once("includes/header.php");
		?>
		<main id="main">
			<div class="container two-cols">
				
				<div class="left-col">
				<?php include_once("includes/client_panel_left_bar.php") ?>
				</div>
				<div class="right-col">
					<div class="content-holder">
						<form id="form" method="POST">
							<h2>My account </h2>
							<div class="input">
								<label for="Nome">Full name</label>
								<div class="input-holder">
									<input type="text" placeholder="Mario" id="Full name" name="name" value="<?php echo $getUserDetails != NULL ? $getUserDetails[0]['name'] : ""; ?>" class="input-control">
								</div>
							</div>
							<div class="input">
								<label for="Email">Email</label>
								<div class="input-holder">
									<input type="text" placeholder="Mario.rossi@gmail.com " id="Email" name="email" value="<?php echo $getUserDetails != NULL ? $getUserDetails[0]['email'] : ""; ?>" class="input-control">
								</div>
							</div>
							<div class="input">
								<label for="Cellulare">Mobile phone</label>
								<div class="input-holder">
									<input type="text" placeholder="332568974" id="Mobile phone" name="phone" value="<?php echo $getVisitorDetails != NULL ? $getVisitorDetails[0]['phone'] : ""; ?>" class="input-control">
								</div>
							</div>
							<div class="input">
								<label for="Password">Password</label>
								<div class="input-holder password">
									<input type="password" placeholder="Enter Password" value="<?php echo $getUserDetails != NULL ? $getUserDetails[0]['password'] : ""; ?>" name="password" id="password" class="input-control">
									<!-- <a href="change_password.php">Change password</a> -->
								</div>
							</div>
							<div class="input">
								<button type="submit" name="submit" class="btn">Save Changes</button>
							</div>
							<div class="input">
								<p>Do you want to delete your Just Cut account? <br> <a href="#" class="link">Delete my account</a> </p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	</div>
</body>


<script src="js/jquery-3.3.1.min.js"></script>

<script src="js/jquery.validate.min.js"></script>

<script>
	$("#form").validate({
		rules: {


			email: {
				required: true,
				remote: {
					url: "includes/ajax_functions.php",
					type: "post",
					data: {
						functionName: "check_new_email",
						email: function() {
							return $("input[name=\"email\"]").val()
						},
						barber_id: <?php echo $userId; ?>
					}
				}
			},
			password: {
				required: true,
				remote: {
					url: "includes/ajax_functions.php",
					type: "post",
					data: {
						functionName: "check_password_strength",
						newPassword: function() {
							return $("#password").val()
						}
					}
				}
			},




		},
		messages: {


			email: {
				required: "Please enter your email",
				email: "Invalid Email"
			},

			password: {
				required: "Please enter your password"
			},


		},

		errorPlacement: function(error, element) {

			error.insertAfter(element);

		},

		errorElement: "div"
	})
</script>

</html>