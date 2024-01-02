const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// Create a Student
app.post('/student-details', async (req, res) => {
  try {
    const { firstName, lastName, rollNo, password, contactNumber, email } = req.body;

    const student = new Student({
      firstName,
      lastName,
      rollNo,
      password,
      contactNumber,
      email,
    });

    await student.save();

    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a student' });
  }
});

// Get all students
app.get('/student-details', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Update a student by roll number
app.put('/updateUser/:rollNo', async (req, res) => {
  try {
    // Find the student by roll number
    const student = await Student.findOne({ rollNo: req.params.rollNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the student data
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.contactNumber = req.body.contactNumber;
    student.email = req.body.email;

    await student.save();

    res.status(200).json({ message: 'Student data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the student data' });
  }
});


// Backend route for fetching student data by roll number
app.get('/student-details/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the student' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  Student.findByIdAndDelete({ _id:id })
  .then(res =>res.json(res))
  .catch(err => res.json(err))
  res.status(200).json({ message: 'Student Deleted successfully' });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
