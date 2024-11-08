<?php
session_start();
require_once 'db_connect.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Fetch all doctors
$stmt = $conn->prepare("SELECT id, name, specialty FROM doctors");
$stmt->execute();
$doctors = $stmt->get_result();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $doctor_id = $_POST['doctor_id'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $user_id = $_SESSION['user_id'];

    // Check if the selected time slot is available
    $stmt = $conn->prepare("SELECT id FROM appointments WHERE doctor_id = ? AND date = ? AND time = ?");
    $stmt->bind_param("iss", $doctor_id, $date, $time);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        // Insert the new appointment
        $stmt = $conn->prepare("INSERT INTO appointments (user_id, doctor_id, date, time) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiss", $user_id, $doctor_id, $date, $time);
        
        if ($stmt->execute()) {
            $success = "Appointment booked successfully!";
        } else {
            $error = "Error booking appointment. Please try again.";
        }
    } else {
        $error = "This time slot is already booked. Please choose another time.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Appointment - Doctor Channeling System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#">DocChannel</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="dashboard.php">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <h1 class="mb-4">Book an Appointment</h1>
        
        <?php if (isset($success)): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>

        <?php if (isset($error)): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="mb-3">
                <label for="doctor_id" class="form-label">Select Doctor</label>
                <select class="form-select" id="doctor_id" name="doctor_id" required>
                    <option value="">Choose a doctor</option>
                    <?php while ($doctor = $doctors->fetch_assoc()): ?>
                        <option value="<?php echo $doctor['id']; ?>">
                            <?php echo htmlspecialchars($doctor['name'] . ' - ' . $doctor['specialty']); ?>
                        </option>
                    <?php endwhile; ?>
                </select>
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" name="date" required>
            </div>
            <div class="mb-3">
                <label for="time" class="form-label">Time</label>
                <input type="time" class="form-control" id="time" name="time" required>
            </div>
            <button type="submit" class="btn btn-primary">Book Appointment</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>