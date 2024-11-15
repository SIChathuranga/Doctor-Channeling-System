<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doctor Channeling System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">DocChannel</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#services">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact</a>
                    </li>
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <li class="nav-item">
                            <a class="nav-link" href="dashboard.php">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="logout.php">Logout</a>
                        </li>
                    <?php else: ?>
                        <li class="nav-item">
                            <a class="nav-link" href="login.php">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="register.php">Register</a>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>

    <section class="hero-section text-center">
        <div>
            <h1>Welcome to Doctor Channeling System</h1>
            <p>Book your appointment with the best doctors online.</p>
            <?php if (!isset($_SESSION['user_id'])): ?>
                <!-- <a href="login.php" class="btn btn-custom mt-4">Book an Appointment</a> -->
                <a href="register.php" class="btn btn-custom mt-4">Register</a>
            <?php else: ?>
                <a href="book_appointment.php" class="btn btn-custom mt-4">Book an Appointment</a>
            <?php endif; ?>
        </div>
    </section>

    <section id="about" class="container py-5">
        <h2 class="text-center mb-4">About Us</h2>
        <p class="text-center">DocChannel is a modern doctor channeling system that allows patients to easily book appointments with their preferred doctors. Our platform streamlines the healthcare experience, saving time for both patients and medical professionals.</p>
    </section>

    <section id="services" class="py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Our Services</h2>
            <div class="row text-center">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card border-0 shadow">
                        <div class="card-body">
                            <h5 class="card-title">Online Booking</h5>
                            <p class="card-text">Book appointments with your preferred doctors anytime, anywhere.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card border-0 shadow">
                        <div class="card-body">
                            <h5 class="card-title">Reminders</h5>
                            <p class="card-text">Receive timely reminders for your upcoming appointments.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card border-0 shadow">
                        <div class="card-body">
                            <h5 class="card-title">Medical History</h5>
                            <p class="card-text">Securely store and access your medical history online.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    

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

<section id="contact" class="py-5">
        <div class="container">
            <h2 class="text-center mb-4">Contact Us</h2>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <form action="contact_us.php" method="POST">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" name="message" rows="3" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- <form method="POST" action="contact_us.php">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>

        <label for="message">Message:</label>
        <textarea name="message" id="message" required></textarea>

        <button type="submit">Send Message</button>
    </form> -->

    <footer class="text-center py-3 bg-dark text-white">
        <p>&copy; 2024 DocChannel. All Rights Reserved.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>

</html>