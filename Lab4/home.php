<?php
// After processing the form data, add this line to redirect to responses.html
header("Location: responses.html");
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'servlink';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection error : " . $conn->connect_error);
}
echo ("Connected Successfully! ");

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];
$city = $_POST['city'];

$sql = "INSERT INTO enquiry VALUES ('$name',$phone,'$email','$city','$message')";
if ($conn->query($sql) == True) {
    echo ("Successfully Entered Data");
} else {
    echo ("Error Entering the Data");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Page</title>
</head>

<body>
    <h1>Welcome!</h1>

    <?php
    // Check if the form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $city = $_POST["city"];
        $message = $_POST["message"];

        // Display the submitted data
        echo "<p>Thank you, $name, for your Enquiry ! <b> We will reach back to you as soon as possible</p>";

    } else {
        echo "<p>No data submitted. Please fill out the form.</p>";
    }
    ?>

</body>

</html>