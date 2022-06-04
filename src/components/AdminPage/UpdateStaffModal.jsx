import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function UpdateStaffModal(props) {
  const [isLoading, setIsLoading] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: props?.academic?.name,
      academicStaffId: props?.academic?.academicStaffId,
      email: props?.academic?.email,
      designation: props?.academic?.designation,
      faculty: props?.academic?.faculty,
      contactNumber: props?.academic?.contactNumber,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required field"),
      academicStaffId: Yup.string().required(" Required field"),
      email: Yup.string().required(" required field"),
      designation: Yup.string().required(" required field"),
      faculty: Yup.string().required(" required field"),
      contactNumber: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      setIsLoading(true)
      fetch("http://localhost:4000/api/admin/update-academic-staff", {
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
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
          setIsLoading(false)
        });
      props.userupdated();
      props.onHide();
    },
  });

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      {isLoading && <LoadingSpinner />}
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Update Staff Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div>Staff ID</div>
          <div className="pt-2">
            <input
              className={`input ${
                formik.touched.academicStaffId && formik.errors.academicStaffId
                  ? "input-error"
                  : ""
              }`}
              type="text"
              name="academicStaffId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academicStaffId}
            />
            <div className="p-1 pt-2 text-danger">
              {formik.touched.academicStaffId && formik.errors.academicStaffId
                ? formik.errors.academicStaffId
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

          <div>Designation</div>
          <div className="pt-2">
            <input
              className={`input ${
                formik.touched.designation && formik.errors.designation
                  ? "input-error"
                  : ""
              }`}
              type="text"
              name="designation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.designation}
            />
            <div className="p-1 pt-2 text-danger">
              {formik.touched.designation && formik.errors.designation
                ? formik.errors.designation
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

export default UpdateStaffModal;
