import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { FormControlLabel, TextField } from '@mui/material';
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
    // <div className="row container">
    //   <div className="col-md-6 col-lg-6">
    //     <div className="login-form">
    //       <div className="heading-main">Login to SLIIT RPMS</div>
    //       <div className="sub-heading">
    //         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cupiditate doloremque
    //         dolores enim eum excepturi, exercitationem facere fugit ipsa laborum libero magni nihil,
    //         provident quam qui repellendus sint totam, veniam.
    //       </div>
    //       <form className="login-form mt-5">
    //         <Box
    //           component="form"
    //           sx={{
    //             '& .MuiTextField-root': { m: 1, width: '80%' }
    //           }}
    //           noValidate
    //           autoComplete="off">
    //           <TextField id="outlined-email-input" label="Email" type="email" />
    //           <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
    //             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    //             <OutlinedInput
    //               id="outlined-adornment-password"
    //               type={values.showPassword ? 'text' : 'password'}
    //               value={values.password}
    //               onChange={handleChange('password')}
    //               endAdornment={
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     aria-label="toggle password visibility"
    //                     onClick={handleClickShowPassword}
    //                     onMouseDown={handleMouseDownPassword}
    //                     edge="end">
    //                     {values.showPassword ? <VisibilityOff /> : <Visibility />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               }
    //               label="Password"
    //             />
    //           </FormControl>
    //           <div className="d-flex justify-content-between forgot-password">
    //             <FormControlLabel
    //               sx={{ m: 1, width: 'auto' }}
    //               control={
    //                 <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
    //               }
    //               label="Remember Me"
    //             />
    //             <a href="#"> forgot password</a>
    //           </div>
    //           <input type="submit" value="Login" className="btn btn-primary btn-block submit-btn" />
    //         </Box>
    //       </form>
    //     </div>
    //   </div>
    //   <div className="col-md-6 col-lg-6 right-img"></div>
    // </div>
    <div>
      <Container className="login-outer-wrapper">
        <Row className="login-container no-gutters">
          <Col md className="login-bg-image img-fluid">
            <div className="bg-text"></div>
          </Col>
          <Col md className="login-form-wrapper">
            <Form>
              <h1 className="form-title mb-3 mt-4">Login</h1>

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

              <div className="forgot-password mb-3">
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
