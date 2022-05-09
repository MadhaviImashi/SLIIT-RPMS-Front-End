import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home Page/Home';
import StudentSignup from './components/SignUpPage/Student/SignUp';
import StaffSignup from './components/SignUpPage/Staff/SignUp';
import Login from './components/LoginPage/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-register" element={<StudentSignup />} />
        <Route path="/staff-register" element={<StaffSignup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
