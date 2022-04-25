import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from 'antd';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Login = () => {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Container className="login-outer-wrapper">
        <Row className="login-container no-gutters">
          <Col md className="login-bg-image img-fluid">
            <div className="bg-text"></div>
          </Col>
          <Col md className="login-form-wrapper">
            <Form>
              <h1 className="form-title mb-3 mt-4">Sign In</h1>

              <p className="sub-title mb-4">Sign in to your SLIIT RPMS account</p>

              <Form.Group className="login-email mb-4" controlId="email">
                <Form.Control required type="email" placeholder="Email" />
              </Form.Group>

              <FormControl className="mb-3">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}>
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <div className="forgot-password mb-4">
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
                <a href="#"> forgot password</a>
              </div>

              <div className="mb-4">
                <Button type="submit" className="btn-login">
                  Login
                </Button>
              </div>

              <p className="hyperlink mb-4">
                Don't have an account? <a href="#">Register</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
