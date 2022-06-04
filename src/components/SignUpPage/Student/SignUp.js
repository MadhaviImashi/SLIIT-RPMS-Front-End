import "./SignUp.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from "../../Message/Message";

const SignUp = () => {
  const specObj = [
    { name: "FOC", spec: ["DS", "IT", "SE"] },
    { name: "FOE", spec: ["ENG", "Archi"] },
    { name: "BM", spec: ["BM1", "BM2", "BM3"] },
    { name: "HS", spec: ["Humanity Sciences 1", "Humanity Sciences 2"] },
    { name: "SA", spec: ["Archi1", "Archi2"] },
  ];

  const [selectedOption, setOption] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSelectFaculty = () => {
    let option = document.getElementById("fac");
    setOption(option.value);
  };

  const setDynamicDropdownOptions = () => {
    specObj.forEach((degree) => {
      if (selectedOption === degree.name) {
        const target = document.getElementById("specialization");
        target.innerHTML = "<option>Specialization</option>";
        degree.spec.forEach((spec) => {
          target.innerHTML +=
            "<option value=" + spec + ">" + spec + "</option>";
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      regno: "",
      email: "",
      password: "",
      spec: "",
      phone:""
    },
    validationSchema: Yup.object({
      name: Yup.string().required(" required field"),
      regno: Yup.string().required(" required field"),
      email: Yup.string().required(" required field"),
      password: Yup.string().required(" required field"),
      spec: Yup.string().required(" required field"),
      phone: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      fetch("http://localhost:4000/api/auth/student-signup", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          studentId: values.regno,
          specialization: selectedOption,
          faculty: values.spec,
          contactNumber: values.phone,
          image: "",
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if(response.status !== 500){
            return response.json();
          }else{
            throw new Error('Registration Failed ! Try again')
          }
        })
        .then((result) => {
          setError("Registered Successfully! Please Login");
          setIsError(true);
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
        });
    },
  });

  return (
    <div>
      <Message show={isError} onHide={e=>setIsError(false)} message={error} title="Login Message"/>
      <Container className="student-signup-outer-wrapper">
        <Row className="signup-container no-gutters">
          <Col md className="student-signup-bg-image img-fluid col-lg-7">
            <div className="bg-text"></div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4" controlId="registrationNo">
                <Form.Control
                  required
                  type="text"
                  placeholder="Registration No ( Ex: IT12345678 )"
                  name="regno"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.regno}
                ></Form.Control>
              </Form.Group>

              <Form.Select
                className="mb-4"
                aria-label="Default select example"
                id="fac"
                onChange={handleSelectFaculty}
              >
                <option>Faculty</option>
                <option value="FOC">Faculty Of Computing</option>
                <option value="FOE">Faculty Of Engineering</option>
                <option value="BM">Faculty Of Business Management</option>
                <option value="HS">Faculty Of Humanity & Sciences</option>
                <option value="SA">School Of Architecture</option>
              </Form.Select>

              <Form.Select
                className="mb-4"
                aria-label="Default select example"
                id="specialization"
                name="spec"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.spec}
              >
                <option>Specialization</option>
                <>{setDynamicDropdownOptions()}</>
              </Form.Select>

              <Form.Group className="mb-4" controlId="email">
                <Form.Control
                  required
                  type="email"
                  placeholder="Email ( Ex: abc@gmail.com )"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="phone">
                <Form.Control
                  required
                  type="phone"
                  placeholder="Phone ( Ex: 0702629599 )"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="pwd">
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmPwd">
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <div className="mb-4">
                <Button type="submit" className="btn-login" name="submit">
                  Register
                </Button>
              </div>

              <p className="hyperlink mb-4">
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <p className="hyperlink mb-4">
                <Link to="/staff-register">Register</Link> as a staff member
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
