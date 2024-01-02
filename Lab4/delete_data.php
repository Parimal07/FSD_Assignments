<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'servlink';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $sql = "DELETE FROM enquiry WHERE email='$email'";

    $response = array(); // Initialize an array for the response

    if ($conn->query($sql) === TRUE) {
        // Data deleted successfully
        $response['status'] = 'success';
        $response['message'] = 'Data deleted successfully.';
    } else {
        // Error deleting data
        $response['status'] = 'error';
        $response['message'] = 'Error deleting data: ' . $conn->error;
    }

    echo json_encode($response); // Return the response as JSON
}

$conn->close();
?>
