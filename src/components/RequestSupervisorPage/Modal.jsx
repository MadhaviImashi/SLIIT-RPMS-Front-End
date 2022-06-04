import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Message from "../Message/Message";
import {useSelector} from 'react-redux';


const AddRequestModal = (props) => {

  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const [message, setMessage] = useState(false);
  const groupID = useSelector(state=>state.group.id);

  const formik = useFormik({
    initialValues: {
      groupId: groupID,
      supervisorId: "",
      domain: "",
      topic: "",
      description: "",
    },
    validationSchema: Yup.object({
      groupId: Yup.string().required(" required field"),
      supervisorId: Yup.string().required(" required field"),
      domain: Yup.string().required(" required field"),
      topic: Yup.string().required(" required field"),
      description: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      setIsLoading(true)
      setIsError(false)
      fetch("http://localhost:4000/api/researchGroup/request-supervisor", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if(result.error){
            throw new Error('Requst Failed')
          }
          setIsLoading(false)
          setIsError(false)
          setIsMessageShow(true)
          setMessage('Request Added!')
        })
        .catch((err) => {
          setIsLoading(false)
          setIsError(true)
          setIsMessageShow(true)
          setMessage(err.message)
        });
    },
  });


  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch("http://localhost:4000/api/admin/get-academicStaff", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("fetch Failed");
        }
      })
      .then((result) => {
        setData(result.academics);

      })
      .catch((err) => {

      });
  }, []);





  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Supervisor Request
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Message
        show={isMessageShow}
        onHide={(e) => {
          setIsError(false);
          setIsMessageShow(false)
          formik.handleReset();
        }}
        message={message}
        title="Request Supervisor"
      />
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div className="row justify-content-center">
            <div className="col-12 create-group-form-bg-color p-5 pt-0 ">
              <div className="mt-2">Group ID</div>
              <div className="pt-2">
                <input
                  className={`input ${
                    formik.touched.groupId && formik.errors.groupId
                      ? "input-error"
                      : ""
                  }`}
                  disabled
                  type="text"
                  name="groupId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.groupId}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.groupId && formik.errors.groupId
                    ? formik.errors.groupId
                    : null}
                </div>
              </div>

              <div className="mt-2">Supervisor ID</div>
              <div className="pt-2">
              <select
                  className={`input ${
                    formik.touched.supervisorId && formik.errors.supervisorId
                      ? "input-error"
                      : ""
                  }`}
                  name="supervisorId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.supervisorId}
                >
                  {data &&
                    data.map((acedemic, index) => {
                      return (
                        <option value={acedemic._id} key={index}>
                          {acedemic.name} 
                        </option>
                      );
                    })}
                </select>
                
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.supervisorId && formik.errors.supervisorId
                    ? formik.errors.supervisorId
                    : null}
                </div>
              </div>

              <div>Domain</div>
              <div className="pt-2">
                <input
                  className={`input ${
                    formik.touched.domain && formik.errors.domain
                      ? "input-error"
                      : ""
                  }`}
                  type="text"
                  name="domain"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.domain}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.domain && formik.errors.domain
                    ? formik.errors.domain
                    : null}
                </div>
              </div>

              <div className="mt-2">Topic</div>
              <div className="pt-2">
                <input
                  className={`input ${
                    formik.touched.topic && formik.errors.topic
                      ? "input-error"
                      : ""
                  }`}
                  type="text"
                  name="topic"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.topic}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.topic && formik.errors.topic
                    ? formik.errors.topic
                    : null}
                </div>
              </div>

              <div className="mt-2">Description</div>
              <div className="pt-2">
                <textarea
                  className={`input p-3 ${
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

              <div className="row mt-5">
                <div className="col-6">
                  <button
                    type="reset"
                    name="reset"
                    onClick={formik.handleReset}
                    className="button"
                  >
                    {" "}
                    Reset
                  </button>
                </div>
                <div className="col-6">
                  <button type="submit" name="submit" className="button">
                    {" "}
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRequestModal;
