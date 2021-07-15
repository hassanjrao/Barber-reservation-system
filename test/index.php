<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <?php
    // $token=file_get_contents("https://courses3089.000webhostapp.com/veg/test.php");

    // include("https://courses3089.000webhostapp.com/veg/test.php");

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://courses3089.000webhostapp.com/veg/test.php");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$token = curl_exec($ch);
curl_close($ch);


echo "Token Got from domain 1: ". $token;
 

    ?>
    <form method="POST" action="https://courses3089.000webhostapp.com/veg/test.php">

        <input type="hidden" name="token" value="<?php echo $token ?>">

        <input type="text" name="name" placeholder="name">

      
        <input type="submit" name="submit" value="submit">

    </form>
</body>

</html>