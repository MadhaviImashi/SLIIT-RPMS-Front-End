import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home Page/Home';
import SignUp from './components/SignUpPage/Student/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
