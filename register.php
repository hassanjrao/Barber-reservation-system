<?php

include_once("database/db_connection.php");
require_once("database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);
$emailAlreadyExists = false;
$passDontMatch = false;
$userRegistered = false;
if (isset($_POST['submit'])) {
	$email = strtolower(trim($_POST['email']));
	$password = $_POST['password'];



	$registerUser = $DB->query("INSERT INTO `users`( `email`, `password`) VALUES(?,?) ON DUPLICATE KEY UPDATE status = 1", array($email, $password)); //Parameters must be ordered

	if ($registerUser != false) {
		$userRegistered = true;
	}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Project Title</title>
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
		<?php include_once("includes/header.php") ?>
		<main id="main">
			<div class="container two-cols single">
				<div class="right-col">
					<form class="content-holder register" id="form" action="register.php" method="POST">
						<h2>Register on JustCut </h2>
						<div class="input">
							<?php if (isset($_POST['submit']) && $userRegistered) { ?>
								<label style="color: green;">Registered successfully!</label>
							<?php } ?>
							<div class="input-holder">
								<input type="email" placeholder="Please enter your email address" name="email" id="email" class="input-control" required>
							</div>

						</div>
						<div class="input">
							<div class="input-holder">
								<input type="password" placeholder="Enter your password" id="password" name="password" class="input-control" required>
							</div>

						</div>
						<div class="input">
							<div class="input-holder">
								<input type="password" placeholder="Confirm your password" id="cpassword" name="cpassword" class="input-control" required>
							</div>
						</div>


						<div class="input">
							<button type="submit" name="submit" class="btn">Create account </button>
						</div>
						<div class="input">
							<p class="note">By creating an account you agree to the <a href="#" class="link">Terms and Conditions of Use.</a> Read our <a href="#" class="link">Privacy</a> and <a href="#" class="link">Cookie Policy.</a>
								<strong class="bold-title">Are you already registered on JustCut? <a href="login.php" class="link text-decoration-none">Login</a></strong>
							</p>
						</div>
					</form>
				</div>
			</div>
		</main>
	</div>

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
							functionName: "check_user_email",
							email: function() {
								return $("input[name=\"email\"]").val()
							}
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
				cpassword: {
					required: true,
					equalTo: "#password"
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
				cpassword: {
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
</body>

</html>