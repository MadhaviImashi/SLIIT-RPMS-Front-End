import SideNav from "../../shared/SideNav/SideNav";
import { MdTopic } from "react-icons/md";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Message from "../Message/Message";
import { useNavigate } from "react-router-dom";

const SubmitTopic = () => {
  const [message, setMessage] = useState("");
  const [isMeessage, setIsMessage] = useState(false);
  const [data, setData] = useState(null);
  const groupId = useSelector((state) => state.group.id);
  const navigate = useNavigate();
  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  const formik = useFormik({
    initialValues: {
      memberOne: "",
      memberTwo: "",
      memberThree: "",
      memberFour: "",
      supervisorID: "",
      coSupervisorID: "",
      topic: "",
      description: "",
    },
    validationSchema: Yup.object({
      memberOne: Yup.string().required("Required field"),
      memberTwo: Yup.string().required(" Required field"),
      memberThree: Yup.string().required(" required field"),
      memberFour: Yup.string().required(" required field"),
      supervisorID: Yup.string().required(" required field"),
      coSupervisorID: Yup.string().required(" required field"),
      topic: Yup.string().required(" required field"),
      description: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      fetch("http://localhost:4000/api/researchGroup/submit-topic", {
        method: "POST",
        body: JSON.stringify({
          groupId: groupId,
          memberOnePart: values.memberOne,
          memberTwoPart: values.memberTwo,
          memberThreePart: values.memberThree,
          memberFourPart: values.memberFour,
          supervisorID: values.supervisorID,
          coSupervisorID: values.coSupervisorID,
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
          setMessage("Registered Successfully!");
          setIsMessage(true);
        })
        .catch((err) => {
          setMessage(err.message);
          setIsMessage(true);
        });
    },
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/researchGroup/submit-topic-details", {
      method: "POST",
      body: JSON.stringify({ groupId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Details retrieved successfully") {
          setData({
            supervisors: result.superviosrs,
            coSupervisors: result.coSupervisors,
            members: result.members,
          });
        } else {
          throw new Error("error");
        }
      })
      .catch((err) => {
      });
  }, []);

  return groupId ? (
    <div className="vh-100">
      <Message
        show={isMeessage}
        onHide={(e) => {
          formik.handleReset();
          setIsMessage(false);
          if (message === "Registered Successfully!") {
            navigate("/group-details");
          }
        }}
        message={message}
        title="Submit Topic"
      />
      <div className="container">
        <SideNav />
        <div className="fs-3 pt-3 d-flex align-items-center ">
          <MdTopic color="#007fff" size={35} />
          <span className="ms-3">Submit Topic</span>
        </div>

        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
          <div className="row justify-content-center">
            <div className="col-5 create-group-form-bg-color mt-3 p-5 border me-3">
              <div>Member One Part - {data?.members[0]?.name}</div>
              <div className="pt-2">
                <textarea
                  rows={1}
                  className={`input  p-3 ${
                    formik.touched.memberOne && formik.errors.memberOne
                      ? "input-error"
                      : ""
                  }`}
                  name="memberOne"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.memberOne}
                  type="text"
                />
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.memberOne && formik.errors.memberOne
                    ? formik.errors.memberOne
                    : null}
                </div>
              </div>

              <div className="mt-2">
                {" "}
                Member Two Part - {data?.members[1]?.name}
              </div>
              <div className="pt-2">
                <textarea
                  rows={1}
                  className={`input p-3 ${
                    formik.touched.memberTwo && formik.errors.memberTwo
                      ? "input-error"
                      : ""
                  }`}
                  name="memberTwo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.memberTwo}
                />

                <div className="p-1 pt-2 text-danger">
                  {formik.touched.memberTwo && formik.errors.memberTwo
                    ? formik.errors.memberTwo
                    : null}
                </div>
              </div>

              <div className="mt-2">
                Member Three Part - {data?.members[2]?.name}
              </div>
              <div className="pt-2">
                <textarea
                  rows={1}
                  className={`input p-3 ${
                    formik.touched.memberThree && formik.errors.memberThree
                      ? "input-error"
                      : ""
                  }`}
                  name="memberThree"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.memberThree}
                />

                <div className="p-1 pt-2 text-danger">
                  {formik.touched.memberThree && formik.errors.memberThree
                    ? formik.errors.memberThree
                    : null}
                </div>
              </div>

              <div className="mt-2">
                Member Four Part - {data?.members[3]?.name}
              </div>
              <div className="pt-2">
                <textarea
                  rows={1}
                  className={`input p-3 ${
                    formik.touched.memberFour && formik.errors.memberFour
                      ? "input-error"
                      : ""
                  }`}
                  name="memberFour"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.memberFour}
                />

                <div className="p-1 pt-2 text-danger">
                  {formik.touched.memberFour && formik.errors.memberFour
                    ? formik.errors.memberFour
                    : null}
                </div>
              </div>
            </div>

            <div className="col-6 create-group-form-bg-color mt-3 p-5 border">
              <div className="mt-2">Supervisor</div>
              <div className="pt-2">
                <select
                  className={`input ${
                    formik.touched.supervisorID && formik.errors.supervisorID
                      ? "input-error"
                      : ""
                  }`}
                  name="supervisorID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.supervisorID}
                >
                  {data?.supervisors &&
                    data.supervisors.map((supervisor, index) => {
                      return (
                        <option value={supervisor.id} key={index}>
                          {supervisor.name}
                        </option>
                      );
                    })}
                </select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.supervisorID && formik.errors.supervisorID
                    ? formik.errors.supervisorID
                    : null}
                </div>
              </div>
              <div>Co-Supervisor</div>
              <div className="pt-2">
                <select
                  className={`input ${
                    formik.touched.coSupervisorID &&
                    formik.errors.coSupervisorID
                      ? "input-error"
                      : ""
                  }`}
                  name="coSupervisorID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.coSupervisorID}
                >
                  {data?.coSupervisors &&
                    data.coSupervisors.map((supervisor, index) => {
                      return (
                        <option value={supervisor.id} key={index}>
                          {supervisor.name}
                        </option>
                      );
                    })}
                </select>
                <div className="p-1 pt-2 text-danger">
                  {formik.touched.coSupervisorID && formik.errors.coSupervisorID
                    ? formik.errors.coSupervisorID
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

              <div className="row mt-1">
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
  ) : (
    <div className="container supervisor-bg-color ">
      <SideNav />
      <div className="fs-3 pt-3 d-flex align-items-center ">
        {/* <MdSupervisorAccount color="#007fff" size={35} /> */}
        <span className="ms-3">Request Supervisor</span>
      </div>
      <div
        className="d-flex justify-content-center flex-column align-items-center "
        style={{ height: "80vh" }}
      >
        <div className="col-5 text-center fs-3 py-4">
          Currently You Do Not Have A Group ! 😢
        </div>
        <div className="col-3">
          <button onClick={handleCreateGroup} className="button">
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitTopic;
