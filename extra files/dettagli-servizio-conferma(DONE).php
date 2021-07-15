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
    <script>window.jQuery || document.write('<script src="js/jquery-3.3.1.min.js" defer><\/script>')</script>
	<script src="js/jquery.main.js" defer></script>
</head>
<body class="has-bg">
	<div id="wrapper"> 
		<header id="header" class="gradient">
			<div class="container">
				<div class="logo">
					<a href="index.html"><img src="images/logo.png" alt="Just Cut"></a>
				</div>
				<a href="#" class="nav-opener"><span></span></a>
				<nav class="main-nav">
					<ul>
						<li><a href="#">Ciao Mario</a></li>
						<li><a href="#">Chi siamo ?</a></li>
						<li><a href="#">Aiuto e Contatti</a></li>
					</ul>
				</nav>
			</div>
		</header>
		<main id="main">
			<div class="container two-cols single">
				<div class="right-col">
					<div class="content-holder register service-date">
						<h2>Conferma i dati del servizio</h2>
						<div class="input">
							<label for="name">Nome</label>
							<div class="input-holder">
								<input type="email" placeholder="Mario" id="name" class="input-control">
							</div>
						</div>
						<div class="input">
							<label for="address" class="large">Indirizzo</label>
							<div class="input-holder input-flex">
								<input type="text" placeholder="Via es. Via Rizzoli" id="address" class="input-control">
								<input type="text" placeholder=" N° es" class="input-control">
							</div>
							<div class="input-holder">
								<input type="text" placeholder="Citofono" class="input-control">
							</div>
							<div class="input-holder">
								<input type="text" placeholder="Interno e scala" class="input-control">
							</div>
						</div>
						<div class="input">
							<label for="">Città</label>
							<div class="input-holder">
								<input type="text" class="input-control">
							</div>
						</div>
						<div class="input">
							<label for="">CAP</label>
							<div class="input-holder">
								<input type="text" class="input-control">
							</div>
						</div>
						<div class="input">
							<button type="submit" class="btn">Continua</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</body>
</html>
