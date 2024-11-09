<?php
session_start();
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Insert the message into the database
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);
    
    if ($stmt->execute()) {
        $_SESSION['contact_success'] = "Your message has been sent successfully. We'll get back to you soon!";
    } else {
        $_SESSION['contact_error'] = "There was an error sending your message. Please try again later.";
    }
}

header("Location: contact_us.php"); // Redirect back to the contact page
exit();
?>

<!-- Frontend form -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
</head>
<body>
    <h2>Contact Us</h2>
    <?php
    if (isset($_SESSION['contact_success'])) {
        echo "<p>{$_SESSION['contact_success']}</p>";
        unset($_SESSION['contact_success']);
    }
    if (isset($_SESSION['contact_error'])) {
        echo "<p>{$_SESSION['contact_error']}</p>";
        unset($_SESSION['contact_error']);
    }
    ?>
    <form method="POST" action="contact_us.php">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>

        <label for="message">Message:</label>
        <textarea name="message" id="message" required></textarea>

        <button type="submit">Send Message</button>
    </form>
</body>
</html>
