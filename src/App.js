import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from './components/LoginPage/Login';
import StaffSignUp from './components/SignUpPage/Staff/SignUp';
// import StudentSignUp from './components/SignUpPage/Student/SignUp';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <StaffSignUp />
    </div>
  );
}

export default App;
