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
			<div class="container two-cols how-to-pay">
				<h2>Come vuoi pagare ? </h2>
				<div class="cols-holder">
					<div class="column">
						<div class="widget-box">
							<ul class="accordion">
								<li class="active">
									<a class="opener" href="#">Carta di credito o carta di debito <i class="icon-angle-down"></i></a>
									<div class="slide">
										<ul class="card-list">
											<li><img src="images/card-visa.png" width="53" height="33" alt="img description"></li>
											<li><img src="images/card-master.png" width="52" height="33" alt="img description"></li>
										</ul>
										<div class="input">
											<label for="card">Numero carta di credito</label>
											<div class="input-holder">
												<input id="card" type="text" class="input-control">
											</div>
											<label for="confirm" class="checkbox-holder">
												<input type="checkbox" id="confirm">
												<span class="checkmark"></span>
												Salva questa carta 
											</label>
										</div>
										<div class="input">
											<label>Data di scadenza </label>
											<div class="input-holder select-holder">
												<select>
													<option>MM</option>
													<option>01</option>
													<option>02</option>
													<option>03</option>
													<option>04</option>
													<option>05</option>
													<option>06</option>
													<option>07</option>
													<option>08</option>
													<option>09</option>
													<option>10</option>
													<option>11</option>
													<option>12</option>
												</select>
												<select>
													<option>YY</option>
													<option>20</option>
													<option>21</option>
													<option>22</option>
													<option>23</option>
													<option>24</option>
													<option>25</option>
													<option>26</option>
													<option>27</option>
													<option>27</option>
													<option>29</option>
													<option>30</option>
													<option>31</option>
													<option>32</option>
													<option>33</option>
													<option>34</option>
													<option>35</option>
													<option>36</option>
													<option>37</option>
													<option>38</option>
													<option>39</option>
													<option>40</option>
												</select>
											</div>
										</div>
										<div class="input">
											<label for="security">Numero di sicurezza</label>
											<div class="input-holder security-number">
												<input id="security" type="text" class="input-control">
												<div class="card-holder">
													<img class="card-img" src="images/card-img01.png" width="66" height="39" alt="img description">
													<span class="text">Il numero a 3 cifre sul retro della carta </span>
												</div>
											</div>
										</div>
										<div class="input">
											<label for="name">Nome</label>
											<div class="input-holder">
												<input id="name" type="text" class="input-control">
											</div>
										</div>
										<div class="input">
											<label for="surname">Cognome </label>
											<div class="input-holder">
												<input id="surname" type="text" class="input-control">
											</div>
										</div>
										<div class="input">
											<label for="confirm1" class="checkbox-holder">
												<input type="checkbox" id="confirm1">
												<span class="checkmark"></span>
												Indirizzo di fatturazione Via Casilina vecchia, 3 (deseleziona questa casella per modificare l’indirizzo di fatturazione) 
											</label>
										</div>
										<div class="input">
											<button type="submit" class="btn">Conferma pagamento</button>
										</div>
									</div>
								</li>
								<li>
									<a class="opener" href="#">Paypal <i class="icon-angle-down"></i></a>
									<div class="slide">
										<div class="input">
											<label class="checkbox-holder" for="confirm2">
												<input type="checkbox" id="confirm2" checked>
												<span class="checkmark"></span>
												Salva i miei dati PayPal per pagare in modalità
											</label>
										</div>
										<div class="input link-holder">
											<a href="#" class="link">Ho un codice sconto</a>
										</div>
										<div class="input">
											<a href="#" class="btn">Conferma I'ordine</a>
										</div>
									</div>
								</li>
								<li>
									<a class="opener" href="#">Contanti alla consegna <i class="icon-angle-down"></i></a>
									<div class="slide">
										<a href="#" class="btn">Conferma I'ordine</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="column">
						<div class="widget-box">
							<strong class="title">Indirizzo di servizio</strong>
							<address>
								<span class="text">Nome: francesco</span>
								<span class="text">Indirizzo: N.civico : Via le mani dagli occhi, 34</span>
								<span class="text">Citofono: Spanfulla</span>
								<span class="text">Interno, Scala : 1 , H </span>
								<span class="text">Città , Cap: Roma , 00255</span>
								<span class="text">Giorno , Data: Venerdi , 23/05/2020</span>
								<span class="text">Ora : 10.30</span>
							</address>
						</div>
						<div class="widget-box">
							<strong class="title">Riepilogo del servizio </strong>
							<ul class="summary-list">
								<li>Servizio Taglio <span class="price">10 €</span></li>
								<li>Servizio Taglio bambino <span class="price">10 €</span></li>
								<li>Servizio Barba <span class="price">5 €</span></li>
							</ul>
						</div>
						<div class="widget-box inner">
							<div class="total-box">
								<strong class="title">Totale Servizio</strong>
								<strong class="title price">25 €</strong>
							</div>
							<span class="durato">
								Durata servizio <br> 60 Minuti
							</span>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</body>
</html>
