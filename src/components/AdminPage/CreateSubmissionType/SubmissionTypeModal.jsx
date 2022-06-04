import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, FormControl, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function SubmissionTypeModal({ setNewSubmission, onHide, show }) {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
      deadlineDate: "",
      deadlineTime: "",
      wordLimit: "",
      maxNofFiles: "",
      maxSubmissionSize: "",
      acceptedFileTypes: [],
      markingScheme: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required field"),
      description: Yup.string().required("Required field"),
      type: Yup.string().required("Required field"),
      deadlineDate: Yup.string().required("Required field"),
      deadlineTime: Yup.string().required("Required field"),
      wordLimit: Yup.string().required("Required field"),
      maxNofFiles: Yup.string().required("Required field"),
      maxSubmissionSize: Yup.string().required("Required field"),
      markingScheme: Yup.mixed().required("Required field"),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", values.markingScheme);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("deadlineDate", values.deadlineDate);
      formData.append("deadlineTime", values.deadlineTime);
      formData.append("wordLimit", values.wordLimit);
      formData.append("maxNofFiles", values.maxNofFiles);
      formData.append("maxSubmissionSize", values.maxSubmissionSize);
      formData.append("acceptedFileTypes", values.acceptedFileTypes);
      fetch("http://localhost:4000/api/admin/create-submission", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status !== 500) {
            return response.json();
          } else {
            throw new Error("Create submission Failed ! Try again");
          }
        })
        .then((result) => {
          setError("Created submission Successfully!");
          setIsError(true);
          setIsLoading(false);
          setNewSubmission();
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
          setIsLoading(false);
          setNewSubmission();
        });
      
      onHide();
    },
  });

  return (
    <Modal onHide={onHide} show={show} size="lg" centered>
      {isLoading && <LoadingSpinner />}
      <Modal.Header closeButton>
        <Modal.Title id="file-input">New Submission Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-3">Submission Name</div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  className={` ${
                    formik.touched.name && formik.errors.name
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Assestment Name"
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
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-3">Submission Description</div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  className={` ${
                    formik.touched.description && formik.errors.description
                      ? "input-error"
                      : ""
                  }`}
                  type="text"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-3">Submission Type</div>
            </div>
            <div className="col-6">
              <div className="">
                <Form.Select
                  className={`input ${
                    formik.touched.type && formik.errors.type
                      ? "input-error"
                      : ""
                  }`}
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="Presentation">Presentation</option>
                  <option value="Document">Document</option>
                </Form.Select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.type && formik.errors.type
                    ? formik.errors.type
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-2 mb-4">Submission Date </div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  className={`py-2  ${
                    formik.touched.deadlineDate && formik.errors.deadlineDate
                      ? "input-error"
                      : ""
                  }`}
                  type="date"
                  name="deadlineDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deadlineDate}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.deadlineDate && formik.errors.deadlineDate
                    ? formik.errors.deadlineDate
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-2 mb-4">Submission Time </div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  className={`py-2  ${
                    formik.touched.deadlineTime && formik.errors.deadlineTime
                      ? "input-error"
                      : ""
                  }`}
                  type="time"
                  name="deadlineTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deadlineTime}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.deadlineTime && formik.errors.deadlineTime
                    ? formik.errors.deadlineTime
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-3 mb-4">Word Limit </div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  placeholder="Word Limit"
                  className={` py-2 ${
                    formik.touched.wordLimit && formik.errors.wordLimit
                      ? "input-error"
                      : ""
                  }`}
                  type="number"
                  name="wordLimit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.wordLimit}
                />

                <div className="p-1 pt-2 text-danger">
                  {formik.touched.wordLimit && formik.errors.wordLimit
                    ? formik.errors.wordLimit
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-3 mb-2">
                Maximum number of <br></br>uploaded files
              </div>
            </div>
            <div className="col-6">
              <div className="pt-3">
                <FormControl
                  className={`  ${
                    formik.touched.maxNofFiles && formik.errors.maxNofFiles
                      ? "input-error"
                      : ""
                  }`}
                  type="number"
                  name="maxNofFiles"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maxNofFiles}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.maxNofFiles && formik.errors.maxNofFiles
                    ? formik.errors.maxNofFiles
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-2 mb-4">Maximum submission size (MB) </div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  className={`  ${
                    formik.touched.maxSubmissionSize &&
                    formik.errors.maxSubmissionSize
                      ? "input-error"
                      : ""
                  }`}
                  type="number"
                  name="maxSubmissionSize"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maxSubmissionSize}
                />

                <div className="p-1 pt-2 text-danger">
                  {formik.touched.maxSubmissionSize &&
                  formik.errors.maxSubmissionSize
                    ? formik.errors.maxSubmissionSize
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-2 mb-4">Accepted file types </div>
            </div>
            <div className="col-6">
              <div className="">
                <div className="d-flex">
                  <Form.Check
                    type="checkbox"
                    value=".docx"
                    label=".docx"
                    name="acceptedFileTypes"
                    className="me-2"
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    value=".pdf"
                    label=".pdf"
                    name="acceptedFileTypes"
                    className="me-2"
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    value=".mp4"
                    label=".mp4"
                    name="acceptedFileTypes"
                    className="me-2"
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    type="checkbox"
                    value=".ppt"
                    label=".ppt"
                    name="acceptedFileTypes"
                    className="me-2"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.acceptedFileTypes &&
                  formik.errors.acceptedFileTypes
                    ? formik.errors.acceptedFileTypes
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex ps-3">
            <div className="col-4">
              <div className="py-2 mb-4">Marking Scheme </div>
            </div>
            <div className="col-6">
              <div className="">
                <FormControl
                  className={`  ${
                    formik.touched.markingScheme && formik.errors.markingScheme
                      ? "input-error"
                      : ""
                  }`}
                  type="file"
                  name="markingScheme"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "markingScheme",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.markingScheme && formik.errors.markingScheme
                    ? formik.errors.markingScheme
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex  justify-content-end pb-3">
            <Button
              className="px-5 me-2"
              onClick={formik.handleReset}
              variant="outline-primary "
              type="reset"
              name="reset"
            >
              Clear
            </Button>
            <Button type="submit" name="submit" className="px-5 me-3">
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SubmissionTypeModal;
