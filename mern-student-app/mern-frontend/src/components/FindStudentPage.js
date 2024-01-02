import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css'; 
import axios from 'axios';

const FindStudentPage = () => {
  const { rollNo } = useParams();
  const [studentData, setStudentData] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student data for the specified roll number and set it to studentData state
    fetch(`http://localhost:3001/student-details/${rollNo}`)
      .then((response) => response.json())
      .then((data) => {
        setStudentData(data);
        setDataFetched(true);
      })
      .catch((error) => console.error('Error:', error));
  }, [rollNo]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    rollNo: Yup.string().required('Roll No is required'),
    contactNumber: Yup.string()
      .required('Contact number is required')
      .matches(/^\d{10}$/, 'Contact number must be 10 digits'),
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Invalid email format'
      ),
  });

  const onSubmit = (values) => {
    // Handle the form submission for updating student data
    fetch(`http://localhost:3001/updateUser/${rollNo}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(values),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Form submitted:', data.message);
    navigate('/student-records');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  };

  const onDelete = (id) => {
    axios.delete('http://localhost:3001/delete/'+id)
    .then(res => {console.log(res)
      navigate('/student-records')})
    .catch((err) => console.error(err))
  }
  

  return (
    <div className="container">
      <h2 className='heading'>Student Details</h2>
      <div className="form-container">
        {dataFetched ? (
          <Formik
            initialValues={{
              id:studentData._id,
              firstName: studentData.firstName || '',
              lastName: studentData.lastName || '',
              rollNo: studentData.rollNo || '',
              contactNumber: studentData.contactNumber || '',
              email: studentData.email || '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control"
                />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control"
                />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="rollNo">Roll No</label>
                <Field
                  type="text"
                  name="rollNo"
                  id="rollNo"
                  className="form-control"
                  disabled
                />
                <ErrorMessage name="rollNo" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <Field
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  className="form-control"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className='btn-group'>
              <button onSubmit={onSubmit} type="submit" >
                Update
              </button>
              <button id="del-btn" type="button" onClick={() => onDelete(studentData._id)}>
                Delete
              </button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default FindStudentPage;