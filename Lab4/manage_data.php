<!DOCTYPE html>
<html>
<head>
    <title>Manage Data</title>
</head>
<body>
    <h2>Manage Data</h2>
    
    <!-- Form for updating data -->
    <form action="update_data.php" method="post">
        <h3>Update Data</h3>
        Email: <input type="text" name="email" required>
        Name: <input type="text" name="name">
        Phone: <input type="text" name="phone">
        City: <input type="text" name="city">
        Message: <input type="text" name="message">
        <input type="submit" value="Update">
    </form>

    <br>

    <h3>Delete Data</h3>
    <!-- Table to display data and delete buttons -->
    <?php
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'servlink';

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection error : " . $conn->connect_error);
    }

    $sql = "SELECT * FROM enquiry";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<table border='1'>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>";

        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["name"] . "</td>";
            echo "<td>" . $row["phone"] . "</td>";
            echo "<td>" . $row["email"] . "</td>";
            echo "<td>" . $row["city"] . "</td>";
            echo "<td>" . $row["message"] . "</td>";
            echo "<td><a href='delete_data.php?email=" . $row["email"] . "'>Delete</a></td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "No data found in the database.";
    }

    $conn->close();
    ?>
</body>
</html>
