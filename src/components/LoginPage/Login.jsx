import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "antd";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from "../Message/Message";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: values.username,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      dispatch(
        login({
          token: result.token,
          loginID: result.user._id,
          type: result.user.type,
          email: result.user.email,
          name: result.user.student?.name || result.user.academicStaff?.name,
          userID: result.user.student?._id || result.user.academicStaff?._id,
        })
      );

      localStorage.setItem(
        "login",
        JSON.stringify({
          token: result.token,
          loginID: result.user._id,
          type: result.user.type,
          email: result.user.email,
          name: result.user.student?.name || result.user.academicStaff?.name,
          userID: result.user.student?._id || result.user.academicStaff?._id,
        })
      );

      if (result.user.type === "student") {
        navigate("/group-details", { replace: true });
      } else if (result.user.type === "admin") {
        navigate("/manage-students", { replace: true });
      } else if (result.user.type === "academicStaff") {
        navigate("/supervisor", { replace: true });
      }
    } catch (error) {

      setIsError(true);
    }
  };

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("login"));

    if (
      result &&
      result.token &&
      result.userID &&
      result.type &&
      result.email
    ) {
      dispatch(
        login({
          token: result.token,
          userID: result.userID,
          loginID: result.loginID,
          type: result.type,
          email: result.email,
          name: result.name,
        })
      );
      if (result.type === "student") {
        navigate("/group-details", { replace: true });
      } else if (result.type === "admin") {
        navigate("/manage-students", { replace: true });
      } else if (result.type === "academicStaff") {
        navigate("/supervisor", { replace: true });
      }
    }
  }, []);

  return (
    <div>
      <Container className="login-outer-wrapper">
        <Message
          show={isError}
          title="Login Error"
          message="Username or password is incorrect!"
          onHide={() => {
            setIsError(false);
          }}
        />
        <Row className="login-container no-gutters">
          <Col md className="login-bg-image img-fluid">
            <div className="bg-text"></div>
          </Col>
          <Col md className="login-form-wrapper">
            <Form onSubmit={submitHandler}>
              <h1 className="form-title mb-3 mt-4">Sign In</h1>

              <p className="sub-title mb-4">
                Sign in to your SLIIT RPMS account
              </p>

              <Form.Group className="login-email mb-4" controlId="email">
                <Form.Control
                  className="input-email"
                  onChange={handleChange("username")}
                  required
                  type="email"
                  placeholder="Email"
                  value={values.username}
                />
              </Form.Group>

              <FormControl className="mb-3">
                <InputLabel>Password</InputLabel>

                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <div className="forgot-password mb-4">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember Me"
                />
                <a href="#"> forgot password</a>
              </div>

              <div className="mb-4">
                <Button type="submit" className="btn-login">
                  Login
                </Button>
              </div>

              <p className="hyperlink mb-4">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account?
                <Link to="/student-register">Register</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
