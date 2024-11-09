<?php
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    // Redirect if the user is not logged in
    header("Location: login.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $doctor_id = $_POST['doctor_id'];
    $patient_id = $_SESSION['user_id']; // assuming user_id is stored in session
    $appointment_date = $_POST['appointment_date']; // This should match your column in the database (appointment_date)

    // Check if the doctor_id exists in the doctors table
    $doctor_check = $conn->prepare("SELECT id FROM doctors WHERE id = ?");
    $doctor_check->bind_param("i", $doctor_id);
    $doctor_check->execute();
    $doctor_check_result = $doctor_check->get_result();

    if ($doctor_check_result->num_rows == 0) {
        $_SESSION['appointment_error'] = "Selected doctor does not exist.";
        header("Location: book_appointment.php");
        exit();
    }

    // Insert the appointment into the database
    $stmt = $conn->prepare("INSERT INTO appointments (doctor_id, patient_id, appointment_date) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $doctor_id, $patient_id, $appointment_date); // 'i' for integer, 's' for string

    if ($stmt->execute()) {
        $_SESSION['appointment_success'] = "Appointment booked successfully!";
        header("Location: dashboard.php"); // Redirect to the dashboard
        exit();
    } else {
        $_SESSION['appointment_error'] = "Error booking appointment: " . $stmt->error;
    }
}
?>

<!-- Frontend form -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Appointment</title>
</head>
<body>
    <h2>Book Appointment</h2>
    <form method="POST" action="book_appointment.php">
        <label for="doctor_id">Doctor:</label>
        <select name="doctor_id" id="doctor_id" required>
            <!-- Assuming doctors are stored in the database -->
            <?php
            $result = $conn->query("SELECT id, name FROM doctors");
            while ($doctor = $result->fetch_assoc()) {
                echo "<option value='{$doctor['id']}'>{$doctor['name']}</option>";
            }
            ?>
        </select>

        <label for="appointment_date">Appointment Date:</label>
        <input type="datetime-local" name="appointment_date" id="appointment_date" required>

        <button type="submit">Book Appointment</button>
    </form>
    <?php
    if (isset($_SESSION['appointment_error'])) {
        echo "<p>{$_SESSION['appointment_error']}</p>";
        unset($_SESSION['appointment_error']);
    }
    ?>
</body>
</html>
