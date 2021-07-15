<?php
    
    if(session_id() == ''){session_start();}
    // unset($_SESSION['LOGIN']);
    session_destroy();
    header("location: index.php");
