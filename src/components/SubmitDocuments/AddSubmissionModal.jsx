import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Badge, Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function AddSubmissionModal(props) {
  const submitted_file = useRef("");

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);

  const groupState = useSelector((state) => state.group);

  const onAddClick = () => {
    submitted_file.current.click();
  };

  const handleAddFile = () => {
    setIsLoading(true);
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
        setUploadedFiles((pre) => [
          ...pre,
          { name: result.name, file: result.fileUrl },
        ]);
        formik.values.files = result.name;
        setMessage("Uploaded Successfully");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsMessage(true);
        setMessage("Uploading Failed");
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      note: "",
      files: "",
    },
    validationSchema: Yup.object({
      files: Yup.string().required("Add files before submitting"),
    }),

    onSubmit: (values) => {
      setIsSubmitting(true)
      fetch("http://localhost:4000/api/student/submit-doc", {
        method: "POST",
        body: JSON.stringify({
          submissionID: props.submission._id,
          groupID: groupState.id,
          submittedDate: new Date().toLocaleString("en-US"),
          documents: uploadedFiles,
          grade: "To be graded",
          note: values.note, 
          supervisorID:groupState.supervisor.id,
          CosupervisorID:groupState.cosupervisor.id,
          Panelmembers:groupState.panelMembers,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 500) {
            setIsSubmitting(false)
            props.setsubmitted();
            return response.json();
          } else {
            setIsSubmitting(false)
            props.setsubmitted();
            throw new Error("Could not perform the action");
          }
        })
        .catch((err) => {
          setIsSubmitting(false)
          props.setsubmitted();
        });
     
      props.onHide();
    },
  });

  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      {isSubmitting && <LoadingSpinner />}
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Add Submission</Modal.Title>
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
          <input
            type="text"
            value={formik.values.files}
            name="files"
            onChange={formik.handleChange}
            style={{ display: "none" }}
          />
          <div className="">
            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Submitting</div>
              </div>
              <div className="col-9">
                <div className="py-2">{props?.submission?.name}</div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Description</div>
              </div>
              <div className="col-9">
                <div className="py-2">{props?.submission?.description}</div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Student Group</div>
              </div>
              <div className="col-9">
                <div className="py-2">{groupState.name}</div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Status</div>
              </div>
              <div className="col-9">
                <div className="py-2">Pending Submission</div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Close On</div>
              </div>
              <div className="col-9">
                <div className="py-2">{props?.submission?.deadlineDate}</div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Grade</div>
              </div>
              <div className="col-9">
                <div className="py-2">
                  <Badge pill>Add submission</Badge>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Note</div>
              </div>
              <div className="col-9">
                <div className="py-2">
                  <Form.Control
                    name={"note"}
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-2"
                    as="textarea"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Files</div>
              </div>
              <div className="col-9">
                <div className="py-2">
                  <div
                    className="border border-1 px-3 py-2"
                    style={{ height: "6rem" }}
                  >
                    {uploadedFiles.map((doc, index) => {
                      return (
                        <div key={index}>
                          <a href={doc.file}>{doc.name}</a>
                          <br />
                        </div>
                      );
                    })}
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>
                      Max {props?.submission?.maxNofFiles} file of{" "}
                      {props?.submission?.maxSubmissionSize}MB
                    </span>
                    <span className="text-danger">
                      *accepted types{" "}
                      {props?.submission?.acceptedFileTypes.map(
                        (type, index) => {
                          return <span key={index}>{type} </span>;
                        }
                      )}
                    </span>
                  </div>
                  <div className="p-1 pt-2 text-danger">
                    {formik.touched.files && formik.errors.files
                      ? formik.errors.files
                      : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end pt-2">
              <Button
                variant="outline-primary"
                size="sm"
                className="px-3 fw-bold me-2 "
                name="clear"
                type="button"
              >
                Clear
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="px-3 fw-bold me-2"
                onClick={onAddClick}
                name="addfiles"
              >
                Add File{" "}
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
              <Button
                type="submit"
                name="submit"
                variant="outline-primary"
                size="sm"
                className="px-3 fw-bold "
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddSubmissionModal;
