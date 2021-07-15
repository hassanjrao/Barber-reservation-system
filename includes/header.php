<header id="header" class="gradient">
	<div class="container">
		<div class="logo">
			<a href="index.php"><img src="images/logo.png" alt="Just Cut"></a>
		</div>
		<a href="#" class="nav-opener"><span></span></a>
		<nav class="main-nav">
			<ul>
				<?php

				if (isset($_SESSION["user_id"])) {

				?>
					<li><a href="logout.php" class="btn-login">Logout</a></li>
				<?php

				} else {
				?>
					<li><a href="login.php" class="btn-login">Login</a></li>
				<?php
				}

				?>

				<li><a href="#">Who we are ?</a></li>
				<li><a href="#">Help and Contact</a></li>
			</ul>
		</nav>
	</div>
</header>