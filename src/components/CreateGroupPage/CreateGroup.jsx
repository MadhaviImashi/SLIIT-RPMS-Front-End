import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TiGroup } from "react-icons/ti";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SideNav from "../../shared/SideNav/SideNav";
import Message from "../Message/Message";
import "./CreateGroup.css";

const CreateGroup = () => {
  const groupState = useSelector((state) => state.group.id);
  const navigate = useNavigate();

  if (groupState.length > 0) {
    navigate("/group-details");
  }

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const formik = useFormik({
    initialValues: {
      laderID: "",
      secondID: "",
      thirdID: "",
      forthID: "",
      groupName: "",
      topic: "",
      description: "",
    },
    validationSchema: Yup.object({
      laderID: Yup.string().required("Required field"),
      secondID: Yup.string().required(" Required field"),
      thirdID: Yup.string().required(" required field"),
      forthID: Yup.string().required(" required field"),
      groupName: Yup.string().required(" required field"),
      topic: Yup.string().required(" required field"),
      description: Yup.string().required(" required field"),
    }),

    onSubmit: (values, actions) => {
      fetch("http://localhost:4000/api/researchGroup/add-group", {
        method: "POST",
        body: JSON.stringify({
          leaderId: values.laderID,
          secondMemberId: values.secondID,
          thirdMemberId: values.thirdID,
          fourthMemberId: values.forthID,
          groupName: values.groupName,
          topic: values.topic,
          topicDescription: values.description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 500) {
            return response.json();
          } else {
            throw new Error("Registration Failed ! Try again");
          }
        })
        .then((result) => {
          setError("Registered Successfully!");
          setIsError(true);
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
        });
    },
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/student/get-students-no-group", {
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
        setData(result.students);
      })
      .catch((err) => {
      });
  }, []);

  return (
    <div className="create-group-bg-color vh-100">
      <SideNav />
      <Message
        show={isError}
        onHide={(e) => {
          setIsError(false);
          formik.handleReset();
          if (error === "Registered Successfully!") {
            navigate("/group-details");
          }
        }}
        message={error}
        title="Group Creation"
      />
      <div className="container ">
        <div className="fs-3 pt-3 d-flex align-items-center ">
          <TiGroup color="#007fff" />
          <span className="ms-3">Create Group</span>
        </div>
        <div className="row">
          <div className="col-5">
            <div className="pt-5 text-blue ps-5">Student Details</div>
          </div>
          <div className="col-6">
            <div className="pt-5 text-blue ps-5 ms-3">Topic Details</div>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div className="row justify-content-center">
            <div className="col-5 create-group-form-bg-color mt-3 p-5 border me-3">
              <div>Leader ID</div>
              <div className="pt-2">
                <select
                  className={`input ${
                    formik.touched.laderID && formik.errors.laderID
                      ? "input-error"
                      : ""
                  }`}
                  name="laderID"
                  onChange={(e)=>{formik.handleChange(e)}}
                  onBlur={formik.handleBlur}
                  value={formik.values.laderID}
                >
                  {data &&
                    data.map((student, index) => {
                      return (
                        <option value={student._id} key={index}>
                          {student.name} - {student.studentId}
                        </option>
                      );
                    })}
                </select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.laderID && formik.errors.laderID
                    ? formik.errors.laderID
                    : null}
                </div>
              </div>

              <div className="mt-2">Second Member ID</div>
              <div className="pt-2">
                <select
                  className={`input ${
                    formik.touched.secondID && formik.errors.secondID
                      ? "input-error"
                      : ""
                  }`}
                  name="secondID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.secondID}
                >
                  {data &&
                    data.map((student, index) => {
                      return (
                        <option value={student._id} key={index}>
                          {student.name} - {student.studentId}
                        </option>
                      );
                    })}
                </select>

                <div className="p-1 pt-2 text-danger">
                  {formik.touched.secondID && formik.errors.secondID
                    ? formik.errors.secondID
                    : null}
                </div>
              </div>

              <div className="mt-2">Third Member ID</div>
              <div className="pt-2">
                <select
                  className={`input ${
                    formik.touched.thirdID && formik.errors.thirdID
                      ? "input-error"
                      : ""
                  }`}
                  name="thirdID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.thirdID}
                >
                  {data &&
                    data.map((student, index) => {
                      return (
                        <option value={student._id} key={index}>
                          {student.name} - {student.studentId}
                        </option>
                      );
                    })}
                </select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.thirdID && formik.errors.thirdID
                    ? formik.errors.thirdID
                    : null}
                </div>
              </div>

              <div className="mt-2">Fourth Member ID</div>
              <div className="pt-2">
                <select
                  className={`input ${
                    formik.touched.forthID && formik.errors.forthID
                      ? "input-error"
                      : ""
                  }`}
                  name="forthID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.forthID}
                >
                  {data &&
                    data.map((student, index) => {
                      return (
                        <option value={student._id} key={index}>
                          {student.name} - {student.studentId}
                        </option>
                      );
                    })}
                </select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.forthID && formik.errors.forthID
                    ? formik.errors.forthID
                    : null}
                </div>
              </div>
            </div>

            <div className="col-6 create-group-form-bg-color mt-3 p-5 border">
              <div>Group Name</div>
              <div className="pt-2">
                <input
                  className={`input ${
                    formik.touched.groupName && formik.errors.groupName
                      ? "input-error"
                      : ""
                  }`}
                  type="text"
                  name="groupName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.groupName}
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.groupName && formik.errors.groupName
                    ? formik.errors.groupName
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
      </div>
    </div>
  );
};

export default CreateGroup;
