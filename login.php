<?php

session_start();


include_once("database/db_connection.php");
require_once("database/PDO.class.php");
$DB = new Db(DBHost, DBPort, DBName, DBUser, DBPassword);

$userDoesntExist = false;


if (isset($_POST['submit'])) {
	$email = strtolower(trim($_POST['email']));
	$password = $_POST['password'];

	$getUser = $DB->query("SELECT * FROM users WHERE email=? AND password = ? AND status = 1", array($email, $password));

	if ($getUser == null) {
		$userDoesntExist = true;
	} else {
		$_SESSION['user_email'] = $getUser[0]['email'];
		$_SESSION['user_name'] = $getUser[0]['name'];
		$_SESSION['user_id'] = $getUser[0]['userid'];
		$_SESSION['user_type'] = $getUser[0]['usertype'];
		if ($_SESSION['user_type'] == 2) {
			header("location: barber/index.php");
		} else {
			header("location: client_panel.php");
		}
	}
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login</title>
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
					<form action="login.php" method="POST" class="content-holder register">
						<h2>Login </h2>
						<?php if (isset($_POST['submit']) && $userDoesntExist) { ?>
							<label style="color: red;">Email or Password is wrong!</label>
						<?php } ?>
						<div class="input">
							<div class="input-holder">
								<input type="email" placeholder="Enter your email" id="email" name="email" class="input-control" required>
							</div>
						</div>
						<div class="input">
							<div class="input-holder">
								<input type="password" placeholder="Enter your password" id="password" name="password" class="input-control" required>
							</div>
							<!-- <a href="#" class="link large">Hai dimenticato la password ?</a> -->
						</div>
						<!-- <div class="input">
							<label for="confirm" class="checkbox-holder">
								<input type="checkbox" id="confirm">
								<span class="checkmark"></span>
								Ricordami su questo computer Non selezionare se è un computer condiviso
							</label>
						</div> -->
						<div class="input">
							<button type="submit" name="submit" class="btn">Login </button>
						</div>
						<div class="input">
							<strong class="bold-title">First time on JustCut? <a href="register.php" class="link text-decoration-none">Create an account</a></strong>
							<p class="note">By creating an account you agree to the<a href="#" class="link"> Terms and Conditions of Use.</a> Read our <a href="#" class="link">Privacy</a> and <a href="#" class="link">Cookie Policy.</a></p>
						</div>
					</form>
				</div>
			</div>
		</main>
	</div>
</body>

</html>