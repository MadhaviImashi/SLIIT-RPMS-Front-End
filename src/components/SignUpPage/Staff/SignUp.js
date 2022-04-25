import './SignUp.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const SignUp = () => {
  return (
    <div>
      <Container className="outer-wrapper">
        <Row className="signup-container no-gutters">
          <Col md className="staff-signup-bg-image img-fluid col-lg-7">
            <div className="bg-text"></div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form>
              <h1 className="form-title mb-3 mt-4">Sign Up</h1>
              <p className="sub-title mb-4">
                Staff members can fill in the below form to create an account.
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

              <Form.Select className="mb-4" aria-label="Default select example">
                <option>Faculty</option>
                <option value="FOC">Faculty Of Computing</option>
                <option value="FOE">Faculty Of Engineering</option>
                <option value="BM">Faculty Of Business Management</option>
                <option value="HS">Faculty Of Humanity & Sciences</option>
                <option value="SA">School Of Architecture</option>
              </Form.Select>

              <div key="inline-radio" className="mb-3">
                <Form.Check
                  inline
                  label="Panel member"
                  name="role"
                  value="panel"
                  type="radio"
                  id="panel"
                />
                <Form.Check
                  inline
                  label="Supervisor"
                  name="role"
                  value="Supervisor"
                  type="radio"
                  id="supervisor"
                />
                <Form.Check
                  inline
                  label="Co-supervisor"
                  name="role"
                  value="co-supervisor"
                  type="radio"
                  id="coSupervisor"
                />
              </div>

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

              <p className="hyperlink mb-2">
                Already have an account? <a href="#">Login</a>
              </p>
              <p className="hyperlink mb-4">
                <a href="#">Register</a> as a student
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
