<?php
session_start(); // Start the session

// Destroy the session to log the user out
session_destroy();

// Redirect to the homepage or login page
header("Location: index.php");
exit();
?>
