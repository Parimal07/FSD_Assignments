import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import StudentRecords from './components/StudentRecords';
import FindStudentPage from './components/FindStudentPage';
// import UpdateStudentPage from './components/UpdateStudentPage';
// import DeleteStudentPage from './components/DeleteStudentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/student-records" element={<StudentRecords />} />
        <Route path="/find/:rollNo" element={<FindStudentPage />} />
        {/* <Route path="/update-student/:rollNo" element={<UpdateStudentPage />} /> */}
        {/* <Route path="/delete-student/:rollNo" element={<DeleteStudentPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
