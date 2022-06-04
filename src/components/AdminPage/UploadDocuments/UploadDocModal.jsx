import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormControl, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Message from "../../Message/Message";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

function UploadDocModal(props) {
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "Report Template",
      file: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required field"),
      type: Yup.string().required(" Required field"),
      file: Yup.mixed().required("Required Field"),
    }),

    onSubmit: (values) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("type", values.type);
      formData.append("name", values.name);

      fetch("http://localhost:4000/api/admin/create-template", {
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
          setIsLoading(false);
          setIsMessage(true);
          setMessage("Uploaded Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsMessage(true);
          setMessage("Uploading Failed");
        });
    },
  });
  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      {isLoading && <LoadingSpinner />}
      <Message
        show={isMessage}
        onHide={(e) => {
          setIsMessage(false);
          props.setModalShow(false);
          props.refresh();
        }}
        message={message}
        title="Upload Template"
      />
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Upload Template</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div className=" ps-3">
            <div className="row">
              <div className="col-12 py-2">Document Name</div>
              <div className="col-12">
                <FormControl
                  placeholder="Document Name"
                  className={`input ${
                    formik.touched.name && formik.errors.name
                      ? "input-error"
                      : ""
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
              <div className="col-12 py-2">Template Name</div>
              <div className="col-12">
                <Form.Select
                  className={`input ${
                    formik.touched.type && formik.errors.type
                      ? "input-error"
                      : ""
                  }`}
                  type="text"
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                >
                  <option value="not provided">Please Select Type</option>
                  <option value="Report Template">Report Template</option>
                  <option value="Presentation Template">
                    Presentation Template
                  </option>
                </Form.Select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.type && formik.errors.type
                    ? formik.errors.type
                    : null}
                </div>
              </div>
              <div className="col-12 py-2">Template</div>
              <div className="col-12">
                <FormControl
                  type="file"
                  className={`input ${
                    formik.touched.file && formik.errors.file
                      ? "input-error"
                      : ""
                  }`}
                  name="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.file && formik.errors.file
                    ? formik.errors.file
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex pt-3 justify-content-end pb-3">
            <Button
              onClick={formik.handleReset}
              variant="outline-primary "
              type="reset"
              name="reset"
              className="px-5 me-2"
            >
              Clear
            </Button>
            <Button
              variant="outline-primary "
              type="submit"
              name="submit"
              className="px-5 "
            >
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UploadDocModal;
