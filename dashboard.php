<?php
session_start();
require_once 'db_connect.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Fetch user information
$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT username, role FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Fetch appointments
$stmt = $conn->prepare("SELECT a.id, a.date, a.time, d.name as doctor_name, d.specialty 
                        FROM appointments a 
                        JOIN doctors d ON a.doctor_id = d.id 
                        WHERE a.user_id = ? 
                        ORDER BY a.date, a.time");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$appointments = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Doctor Channeling System</title>
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
                        <a class="nav-link" href="appointment.php">Book Appointment</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <h1 class="mb-4">Welcome, <?php echo htmlspecialchars($user['username']); ?></h1>
        
        <div class="row">
            <div class="col-md-8">
                <h2>Your Appointments</h2>
                <?php if ($appointments->num_rows > 0): ?>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor</th>
                                <th>Specialty</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($appointment = $appointments->fetch_assoc()): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($appointment['date']); ?></td>
                                    <td><?php echo htmlspecialchars($appointment['time']); ?></td>
                                    <td><?php echo htmlspecialchars($appointment['doctor_name']); ?></td>
                                    <td><?php echo htmlspecialchars($appointment['specialty']); ?></td>
                                    <td>
                                        <a href="edit_appointment.php?id=<?php echo $appointment['id']; ?>" class="btn btn-sm btn-primary">Edit</a>
                                        <a href="cancel_appointment.php?id=<?php echo $appointment['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to cancel this appointment?')">Cancel</a>
                                    </td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p>You have no upcoming appointments.</p>
                <?php endif; ?>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Quick Actions</h5>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <a href="appointment.php" class="btn btn-primary btn-block">Book New Appointment</a>
                            </li>
                            <li class="list-group-item">
                                <a href="medical_history.php" class="btn btn-secondary btn-block">View Medical History</a>
                            </li>
                            <li class="list-group-item">
                                <a href="profile.php" class="btn btn-info btn-block">Update Profile</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>