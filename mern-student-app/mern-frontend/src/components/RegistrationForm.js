import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    rollNo: Yup.string().required('Roll No/ID is required'),
    password: Yup.string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters')
      .matches(
        /(?=.*[A-Z])(?=.*\d)(?=.*[@#$&])/,
        'Password must contain at least one uppercase letter, one digit, and one special character (@#$&)'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    contactNumber: Yup.string()
      .required('Contact number is required')
      .matches(/^\d{10}$/, 'Contact number must be 10 digits'),
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Invalid email format'
      ),
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = new useNavigate();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    // Your form submission code
    fetch('http://localhost:3001/student-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form submitted:', data.message);
        setSubmitted(true);
        resetForm();
        navigate('/student-records');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="container">
      <h2 className='heading'>Student Registration Form</h2>
      <div className="form-container">
        {submitted ? (
          <div className="success-message">Form submitted successfully!</div>
        ) : (
          <>
            
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                rollNo: '',
                password: '',
                confirmPassword: '',
                contactNumber: '',
                email: '',
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
                  <label htmlFor="rollNo">Roll No/ID</label>
                  <Field
                    type="text"
                    name="rollNo"
                    id="rollNo"
                    className="form-control"
                  />
                  <ErrorMessage name="rollNo" component="div" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
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

                <button type="submit" className="btn btn-primary center-button">
                  Submit
                </button>
              </Form>
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
