import './SignUp.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

const SignUp = () => {
  const specObj = [
    { name: 'FOC', spec: ['DS', 'IT', 'SE'] },
    { name: 'FOE', spec: ['ENG', 'Archi'] },
    { name: 'BM', spec: ['BM1', 'BM2', 'BM3'] },
    { name: 'HS', spec: ['Humanity Sciences 1', 'Humanity Sciences 2'] },
    { name: 'SA', spec: ['Archi1', 'Archi2'] }
  ];

  const [selectedOption, setOption] = useState(null);

  const handleSelectFaculty = () => {
    let option = document.getElementById('fac');
    setOption(option.value);
  };

  const setDynamicDropdownOptions = () => {
    specObj.forEach((degree) => {
      if (selectedOption === degree.name) {
        const target = document.getElementById('specialization');
        target.innerHTML = '<option>Specialization</option>';
        degree.spec.forEach((spec) => {
          target.innerHTML += '<option value=' + spec + '>' + spec + '</option>';
        });
      }
    });
  };

  return (
    <div>
      <Container className="student-signup-outer-wrapper">
        <Row className="signup-container no-gutters">
          <Col md className="student-signup-bg-image img-fluid col-lg-7">
            <div className="bg-text"></div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form>
              <h1 className="form-title mb-3 mt-4">Sign Up</h1>
              <p className="sub-title mb-4">
                Student can fill in the below form to create an account.
              </p>

              <Form.Group className="mb-4" controlId="name">
                <Form.Control required type="text" placeholder="Name"></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4" controlId="registrationNo">
                <Form.Control
                  required
                  type="text"
                  placeholder="Registration No ( Ex: IT12345678 )"></Form.Control>
              </Form.Group>

              <Form.Select
                className="mb-4"
                aria-label="Default select example"
                id="fac"
                onChange={handleSelectFaculty}>
                <option>Faculty</option>
                <option value="FOC">Faculty Of Computing</option>
                <option value="FOE">Faculty Of Engineering</option>
                <option value="BM">Faculty Of Business Management</option>
                <option value="HS">Faculty Of Humanity & Sciences</option>
                <option value="SA">School Of Architecture</option>
              </Form.Select>

              <Form.Select className="mb-4" aria-label="Default select example" id="specialization">
                <option>Specialization</option>
                <>{setDynamicDropdownOptions()}</>
              </Form.Select>

              <Form.Group className="mb-4" controlId="email">
                <Form.Control required type="email" placeholder="Email ( Ex: abc@gmail.com )" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="pwd">
                <Form.Control required type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmPwd">
                <Form.Control required type="password" placeholder="Confirm Password" />
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
