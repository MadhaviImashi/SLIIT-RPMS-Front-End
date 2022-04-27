import './SignUp.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    studentId: '',
    faculty: '',
    specialization: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const inputChangeHandler = (event) => {
    setStudentDetails({ ...studentDetails, [event.target.name]: event.target.value });
  };

  const signUpFormSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:4000/api/student-signup', studentDetails)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Container className="outer-wrapper">
        <Row className="signup-container no-gutters">
          <Col md className="student-signup-bg-image img-fluid col-lg-7">
            <div className="bg-text"></div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form onSubmit={signUpFormSubmitHandler}>
              <h1 className="form-title mb-3 mt-4">Sign Up</h1>
              <p className="sub-title mb-4">
                Student can fill in the below form to create an account.
              </p>

              <Form.Group className="mb-4" controlId="name">
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={(e) =>
                    setStudentDetails({ ...studentDetails, name: e.target.value })
                  }></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4" controlId="registrationNo">
                <Form.Control
                  required
                  type="text"
                  placeholder="Registration No ( Ex: IT12345678 )"
                  name="studentId"
                  onChange={inputChangeHandler}></Form.Control>
              </Form.Group>

              <Form.Select
                className="mb-4"
                aria-label="Default select example"
                onChange={inputChangeHandler}
                name="faculty">
                <option name="faculty">Faculty</option>
                <option value="FOC">Faculty Of Computing</option>
                <option value="FOE">Faculty Of Engineering</option>
                <option value="BM">Faculty Of Business Management</option>
                <option value="HS">Faculty Of Humanity & Sciences</option>
                <option value="SA">School Of Architecture</option>
              </Form.Select>

              <Form.Group className="mb-4" controlId="specialization">
                <Form.Control
                  required
                  type="text"
                  placeholder="Specialization"
                  name="specialization"
                  onChange={inputChangeHandler}></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4" controlId="email">
                <Form.Control
                  required
                  type="email"
                  placeholder="Email ( Ex: abc@gmail.com )"
                  name="email"
                  onChange={inputChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="pwd">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={inputChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmPwd">
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={inputChangeHandler}
                />
              </Form.Group>

              <div className="mb-4">
                <Button type="submit" className="btn-login">
                  Register
                </Button>
              </div>

              <p className="hyperlink mb-4">
                Already have an account? <a href="#">Login</a>
              </p>
              <p className="hyperlink mb-4">
                <a href="#">Register</a> as a staff member
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
