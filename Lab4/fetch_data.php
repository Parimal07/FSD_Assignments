<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'servlink';

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}

$sql = "SELECT * FROM enquiry";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>User Data</h2>";
    echo "<table border='1'>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>City</th>
                <th>Message</th>
            </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["name"] . "</td>";
        echo "<td>" . $row["phone"] . "</td>";
        echo "<td>" . $row["email"] . "</td>";
        echo "<td>" . $row["city"] . "</td>";
        echo "<td>" . $row["message"] . "</td>";
        echo "<td>";
        echo "<button onclick='editData(\"" . $row["email"] . "\", \"" . $row["name"] . "\", \"" . $row["phone"] . "\", \"" . $row["city"] . "\", \"" . $row["message"] . "\")'>Edit</button>";
        echo "<button onclick='deleteData(\"" . $row["email"] . "\")'>Delete</button>";
        echo "</td>";
        echo "</tr>";
    }

    echo "</table>";
} else {
    echo "No data found in the database.";
}

$conn->close();
?>
