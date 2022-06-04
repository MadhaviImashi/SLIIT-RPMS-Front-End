import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function UpdateStudentModal(props) {
  const [isLoading, setIsLoading] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: props?.student?.name,
      studentId: props?.student?.studentId,
      email: props?.student?.email,
      specialization: props?.student?.specialization,
      faculty: props?.student?.faculty,
      contactNumber: props?.student?.contactNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required field"),
      studentId: Yup.string().required(" Required field"),
      email: Yup.string().required(" required field"),
      specialization: Yup.string().required(" required field"),
      faculty: Yup.string().required(" required field"),
      contactNumber: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      fetch("http://localhost:4000/api/admin/update-student", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 500) {
            return response.json();
          } else {
            throw new Error("Could not perform the action");
          }
        })
        .then((result) => {
          setError("Updated Successfully!");
          setIsError(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
          setIsLoading(false);
        });
      props.userupdated();
      props.onHide();
    },
  });

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const specObj = [
    { name: "FOC", spec: ["DS", "IT", "SE"] },
    { name: "FOE", spec: ["ENG", "Archi"] },
    { name: "BM", spec: ["BM1", "BM2", "BM3"] },
    { name: "HS", spec: ["Humanity Sciences 1", "Humanity Sciences 2"] },
    { name: "SA", spec: ["Archi1", "Archi2"] },
  ];

  const [degree, setDegree] = useState(null);

  useEffect(() => {
    specObj.forEach((degree) => {
      if (formik.values.faculty === degree.name) {
        setDegree(degree);
      }
    });
  }, [formik.values.faculty]);

  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      {isLoading && <LoadingSpinner />}
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div>Student ID</div>
          <div className="pt-2">
            <input
              className={`input ${
                formik.touched.studentId && formik.errors.studentId
                  ? "input-error"
                  : ""
              }`}
              type="text"
              name="studentId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.studentId}
            />
            <div className="p-1 pt-2 text-danger">
              {formik.touched.studentId && formik.errors.studentId
                ? formik.errors.studentId
                : null}
            </div>
          </div>

          <div>Name</div>
          <div className="pt-2">
            <input
              className={`input ${
                formik.touched.name && formik.errors.name ? "input-error" : ""
              }`}
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <div className="p-1 pt-2 text-danger">
              {formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null}
            </div>
          </div>

          <div>Email Address</div>
          <div className="pt-2">
            <input
              className={`input ${
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }`}
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="p-1 pt-2 text-danger">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </div>
          </div>

          <div>Faculty</div>
          <div className="pt-2">
            <select
              className={`input ${
                formik.touched.faculty && formik.errors.faculty
                  ? "input-error"
                  : ""
              }`}
              name="faculty"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.faculty}
            >
              <option value="FOC">Faculty Of Computing</option>
              <option value="FOE">Faculty Of Engineering</option>
              <option value="BM">Faculty Of Business Management</option>
              <option value="HS">Faculty Of Humanity & Sciences</option>
              <option value="SA">School Of Architecture</option>
            </select>
            <div className="p-1 pt-2 text-danger">
              {formik.touched.faculty && formik.errors.faculty
                ? formik.errors.faculty
                : null}
            </div>
          </div>

          <div>Specialization</div>
          <div className="pt-2">
            <select
              className={`input ${
                formik.touched.specialization && formik.errors.specialization
                  ? "input-error"
                  : ""
              }`}
              name="specialization"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.specialization}
            >
              {degree?.spec.map((oneSpec,index) => {
                return <option key={index} value={oneSpec}>{oneSpec}</option>;
              })}
            </select>
            <div className="p-1 pt-2 text-danger">
              {formik.touched.specialization && formik.errors.specialization
                ? formik.errors.specialization
                : null}
            </div>
          </div>

          <div>Contact Number</div>
          <div className="pt-2">
            <input
              className={`input ${
                formik.touched.contactNumber && formik.errors.contactNumber
                  ? "input-error"
                  : ""
              }`}
              type="text"
              name="contactNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
            />
            <div className="p-1 pt-2 text-danger">
              {formik.touched.contactNumber && formik.errors.contactNumber
                ? formik.errors.contactNumber
                : null}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="col-3 me-3">
              <button
                type="reset"
                name="submit"
                className="button btn-secondary fw-bold"
                onClick={formik.handleReset}
              >
                Reset
              </button>
            </div>
            <div className="col-3">
              <button
                type="submit"
                name="submit"
                className="button btn-primary fw-bold"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateStudentModal;
