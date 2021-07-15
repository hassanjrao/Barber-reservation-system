<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Project Title</title>
	<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap" rel="stylesheet">
	<link media="all" rel="stylesheet" href="https://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
	<link media="all" rel="stylesheet" href="css/main.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
    <script>window.jQuery || document.write('<script src="js/jquery-3.3.1.min.js" defer><\/script>')</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" defer></script>
	<script src="js/jquery.main.js" defer></script>
</head>
<body>
	<div id="wrapper">
		<header id="header" class="gradient">
			<div class="container">
				<div class="logo">
					<a href="index.html"><img src="images/logo.png" alt="Just Cut"></a>
				</div>
				<a href="#" class="nav-opener"><span></span></a>
				<nav class="main-nav">
					<ul>
						<li class="has-drop"><a href="#" class="drop-opener">Ciao Mario</a>
							<ul class="dropdown">
								<li><a href="#">Account</a></li>
								<li><a href="#">Servizi effettuati </a></li>
								<li><a href="#">Servizi prenotati </a></li>
								<li><a href="#">Indirizzi di servizio   </a></li>
								<li><a href="#">Metodi di pagamento</a></li>
								<li><a href="#">Esci </a></li>
							</ul>
						</li>
						<li><a href="#">Chi siamo ?</a></li>
						<li><a href="#">Aiuto e Contatti   </a></li>
					</ul>
				</nav>
			</div>
		</header>
		<main id="main">
			<div class="container info-section three-cols">
				<div class="content-block">
					<aside class="sidebar">
						<h2><a href="#" class="account-opener">Account</a> </h2>
						<ul class="account-info slide">
							<li><a href="#">Servizi effettuati </a></li>
							<li><a href="#">Servizi prenotati </a></li>
							<li><a href="#">Indirizzi di servizio   </a></li>
							<li><a href="#">Metodi di pagamento</a></li>
						</ul>
					</aside>
					<div class="right-content">
						<div class="center-content">
							<form action="#" class="search-form">
								<button type="submit">
									<img src="images/search-img.png" alt="Image Description">
								</button>
								<input class="input-control" type="search" placeholder="cerca barbieri">
							</form>
							<div class="header">
								<div class="user-col">
									<div class="img-box">
										<img src="images/img02.jpg" width="122" height="138" alt="img description">
									</div>
									<div class="text-box">
										<strong class="title">Marco Zaccaria </strong>
										<ul class="star-rating">
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li>300</li>
										</ul>
									</div>
								</div>
								<div class="text-col">
									<strong class="text"><i class="icon-map-marker"></i> 0.8 Km <span>Da te</span></strong>
								</div>
							</div>
							<div class="header">
								<div class="user-col">
									<div class="img-box">
										<img src="images/img04.jpg" width="122" height="138" alt="img description">
									</div>
									<div class="text-box">
										<strong class="title">Paolo Novembre</strong>
										<ul class="star-rating">
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li>150</li>
										</ul>
									</div>
								</div>
								<div class="text-col">
									<strong class="text"><i class="icon-map-marker"></i> 1,2 Km <span>Da te</span></strong>
								</div>
							</div>
							<div class="header">
								<div class="user-col">
									<div class="img-box">
										<img src="images/img05.jpg" width="122" height="138" alt="img description">
									</div>
									<div class="text-box">
										<strong class="title">Fabio Ceri</strong>
										<ul class="star-rating">
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li>1231</li>
										</ul>
									</div>
								</div>
								<div class="text-col">
									<strong class="text"><i class="icon-map-marker"></i> 2,5 Km <span>Da te</span></strong>
								</div>
							</div>
							<div class="header">
								<div class="user-col">
									<div class="img-box">
										<img src="images/img02.jpg" width="122" height="138" alt="img description">
									</div>
									<div class="text-box">
										<strong class="title">Marco Zaccaria </strong>
										<ul class="star-rating">
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li><img src="images/icon-star.png" width="16" height="16" alt="img description"></li>
											<li>150</li>
										</ul>
									</div>
								</div>
								<div class="text-col">
									<strong class="text"><i class="icon-map-marker"></i> 0.8 Km <span>Da te</span></strong>
								</div>
							</div>
						</div>
						<aside class="right-bar no-border pt-0">
							<div class="radius-away">
								<strong class="title">Raggio di distanza da te</strong>
								<div class="range-slider-wrapper">
								  <div class="slider" data-min="0" data-max="10" data-value="5" data-step="1"></div>
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
									<label for="Barbieri" class="filter">Barbieri</label>
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
</html>
