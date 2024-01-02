<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'servlink';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $message = $_POST['message'];

    $sql = "UPDATE enquiry SET name='$name', phone='$phone', city='$city', message='$message' WHERE email='$email'";

    $response = array();

    if ($conn->query($sql) === TRUE) {
        $response['status'] = 'success';
        $response['message'] = 'Data updated successfully.';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error updating data: ' . $conn->error;
    }

    echo json_encode($response);
}

$conn->close();
?>
