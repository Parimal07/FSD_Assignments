import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentRecords.css';

const StudentRecords = () => {
const [students, setStudents] = useState([]);
const [rollNo, setRollNo] = useState('');
const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/student-details')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleAction = (action) => {
    if (rollNo) {
      if (action === 'find') {
        navigate(`/find/${rollNo}`);
      } else if (action === 'delete') {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <h2 className="heading2">Student Records</h2>
      <div className="button-container">
        <Link to="/">Insert New Student</Link>
        <input
          type="integer"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <button onClick={() => handleAction('find')}>Find</button>
        {/* <button className="delete-button" onClick={() => handleAction('delete')}>
          Delete
        </button> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll No/ID</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.rollNo}</td>
              <td>{student.contactNumber}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRecords;
