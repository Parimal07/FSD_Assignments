<?php
$servername='localhost';
$username='root';
$password='';
$database='students';

$conn=new mysqli($servername,$username,$password,$database);

if($conn->connect_error){
    die("Connection error : " . $conn->connect_error);
}
echo ("Connected Successfully! ");

$name=$_POST['name'];
$school=$_POST['school'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$state=$_POST['state'];
$city=$_POST['city'];
$country="US";
$pincode=$_POST['pincode'];

$sql="INSERT INTO students VALUES ('$name','$school','$phone','$email','$state','$city','$country','$pincode')";
if($conn->query($sql)==True){
    echo ("Successfully Entered Data");
    }
else{
    echo("Error Entering the Data");
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
        $school = $_POST["school"];
        $phone = $_POST["phone"];
        $email = $_POST["email"];
        $state = $_POST["state"];
        $city = $_POST["city"];
        $country = 'India';
        $pincode = $_POST["pincode"];

        // Display the submitted data
        echo "<p>Thank you, $name, for submitting the following information:</p>";
        echo "<ul>";
        echo "<li>School: $school</li>";
        echo "<li>Phone: $phone</li>";
        echo "<li>Email: $email</li>";
        echo "<li>State: $state</li>";
        echo "<li>City: $city</li>";
        echo "<li>Country: $country</li>";
        echo "<li>Pin Code: $pincode</li>";
        echo "</ul>";
    } else {
        echo "<p>No data submitted. Please fill out the form.</p>";
    }
    ?>
    
</body>
</html>
