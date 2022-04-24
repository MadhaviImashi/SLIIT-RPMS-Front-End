import './SignUp.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const SignUp = () => {
  return (
    <div>
      <Container>
        <Row className="signup-container no-gutters">
          <Col md className="signup-bg-image img-fluid col-lg-7">
            <div className="bg-text">
              {/* <h1 className="mb-4">Creat Account</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate
                doloremque dolores enim eum excepturi, exercitationem facere
              </p> */}
            </div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form>
              <h1 className="form-title mb-3 mt-4">Sign Up</h1>
              <p className="sub-title mb-4">
                Student can fill in the below form to create an account
              </p>

              <Form.Group className="mb-4" controlId="name">
                <Form.Control required type="text" placeholder="Name"></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4" controlId="registrationNo">
                <Form.Control
                  required
                  type="text"
                  placeholder="Registration Number ( Ex: IT12345678 )"></Form.Control>
              </Form.Group>

              <Form.Select className="mb-4" aria-label="Default select example">
                <option>Faculty</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

              <Form.Select className="mb-4" aria-label="Default select example">
                <option>Specialization</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

              <Form.Group className="mb-4" controlId="email">
                <Form.Control required type="email" placeholder="Email" />
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
