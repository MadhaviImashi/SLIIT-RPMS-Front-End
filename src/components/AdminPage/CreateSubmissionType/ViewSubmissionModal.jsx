import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { Button, FormControl, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";

function ViewSubmissionModal(props) {
  const submitted_file = useRef("");
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const [title, setTitle] = useState("Current Marking Scheme");

  const [uploadedFile, setUploadedFile] = useState(props?.data?.markingScheme);

  const onAddClick = () => {
    submitted_file.current.click();
  };
  const [message, setMessage] = useState(null);

  const handleAddFile = () => {
    const formData = new FormData();
    formData.append("file", submitted_file.current.files[0]);

    fetch("http://localhost:4000/api/student/add-file", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(" Failed ! Try again");
        }
      })
      .then((result) => {
        setUploadedFile(result.fileUrl);
        setTitle("New Marking Scheme")
        formik.values.files = result.name
        setMessage("Uploaded Successfully");
      })
      .catch((err) => {
        setMessage("Uploading Failed");
      });
  };

  const formik = useFormik({
    initialValues: {
      name: props?.data?.name,
      description: props?.data?.description,
      deadlineDate: props?.data?.deadlineDate,
      deadlineTime: props?.data?.deadlineTime,
      wordLimit: props?.data?.wordLimit,
      maxNofFiles: props?.data?.maxNofFiles,
      maxSubmissionSize: props?.data?.maxSubmissionSize,
      acceptedFileTypes: props?.data?.acceptedFileTypes,
      markingScheme: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required field"),
      description: Yup.string().required("Required field"),
      deadlineDate: Yup.string().required("Required field"),
      deadlineTime: Yup.string().required("Required field"),
      wordLimit: Yup.string().required("Required field"),
      maxNofFiles: Yup.string().required("Required field"),
      maxSubmissionSize: Yup.string().required("Required field"),
    }),

    onSubmit: (values) => {
      fetch("http://localhost:4000/api/admin/update-submission", {
        method: "POST",
        body: JSON.stringify({
          submissionID: props?.data?._id,
          name: values.name,
          description: values.description,
          deadlineDate: values.deadlineDate,
          deadlineTime: values.deadlineTime,
          wordLimit: values.wordLimit,
          maxNofFiles: values.maxNofFiles,
          maxSubmissionSize: values.maxSubmissionSize,
          acceptedFileTypes: values.acceptedFileTypes,
          markingScheme: uploadedFile,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 500) {
            return response.json();
          } else {
            throw new Error("Updating submission Failed ! Try again");
          }
        })
        .then((result) => {
          setError("Updated submission Successfully!");
          setIsError(true);
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
        });
      props.setNewSubmission();
      props.onHide();
    },
  });
  return (
    <Modal onHide={props.onHide} show={props.show} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="file-input">View Submission Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
        <input
            type="file"
            value={""}
            onChange={handleAddFile}
            id="submitted_file"
            ref={submitted_file}
            style={{ display: "none" }}
          />
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
                <span>
                  <a href={uploadedFile}>
                   {title}
                  </a>
                </span>
                <Button variant="outline-primary" className="p-0 ms-3 px-1" onClick={onAddClick} name="close" size="sm">
                  Change
                </Button>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.markingScheme && formik.errors.markingScheme
                    ? formik.errors.markingScheme
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex  justify-content-end pb-3">
            <Button onClick={props.onHide} name="close" className="px-5 me-2">
              Close
            </Button>
            <Button type="submit" name="submit" className="px-5 me-3">
              Update
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ViewSubmissionModal;
