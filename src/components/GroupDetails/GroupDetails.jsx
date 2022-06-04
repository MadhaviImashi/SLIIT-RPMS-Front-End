import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import StudentRow from "./StudentRow";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import React, { useEffect, useState } from "react";
import Events from "./Events";
import SideNav from "../../shared/SideNav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../reducers/groupSlice";
import { useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import ChatModal from "./ChatModal";

const GroupDetails = () => {
  const [value, onChange] = useState(new Date());
  const studentId = useSelector((state) => state.login.userID);
  const dispatch = useDispatch();
  const groupMembers = useSelector((state) => state.group.members);
  const groupState = useSelector((state) => state.group);
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/student/get-group", {
      method: "POST",
      body: JSON.stringify({
        studentId,
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
        dispatch(
          save({
            id: result.group?._id,
            members: result.group?.members,
            name: result.group?.groupName,
            panelMembers: result.group?.panelMembers,
            topic: result.group?.topic,
            topicState: result.group?.topicState,
            supervisor: {
              id: result.group.supervisor?._id,
              name: result.group.supervisor?.name,
              faculty: result.group.supervisor?.faculty,
              contactNumber: result.group.supervisor?.contactNumber,
              email: result.group.supervisor?.email,
            },
            cosupervisor: {
              id: result.group.cosupervisor?._id,
              name: result.group.cosupervisor?.name,
              faculty: result.group.cosupervisor?.faculty,
              contactNumber: result.group.cosupervisor?.contactNumber,
              email: result.group.cosupervisor?.email,
            },
            memberWorks: result.group?.memberWorks,
            description: result.group?.topicDescription,
          })
        );
      })
      .catch((err) => {});
  }, [studentId]);

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  const chatHandler = () => {
    setIsChatOpen((prev) => !prev);
  };

  return groupState.id ? (
    <div
      className="container supervisor-bg-color overflow-x-hidden"
      style={{ maxWidth: "80rem" }}
    >
      {
        <ChatModal
          show={isChatOpen}
          onHide={() => {
            setIsChatOpen(false);
          }}
        />
      }
      <SideNav />
      <div className="fs-3 pt-3 d-flex align-items-center ">
        <MdSpaceDashboard color="#007fff" size={35} />
        <span className="ms-3">Dashboard</span>
      </div>
      <Row className=" mt-3 mb-3 d-flex">
        <Col xs={7}>
          <span className="text-primary fs-5">Group Members</span>
          <Card className="shadow pb-4 mt-3">
            {groupMembers.map((student, index) => {
              return (
                <StudentRow
                  key={index}
                  name={student.name}
                  id={student.studentId}
                  phone={student.contactNumber}
                />
              );
            })}
          </Card>
        </Col>
        <Col xs={5}>
          <div className="row justify-content-between">
            <div className="col-8 d-flex ">
              <span className="text-primary fs-5">Upcomming Events</span>
            </div>
            <div className="col-2 ">
              <Button variant="outline-primary" onClick={chatHandler}>
                Chat
              </Button>
            </div>
          </div>
          <Card className="shadow pb-0 mt-3" style={{ minHeight: "16.12rem" }}>
            <div className="d-flex">
              <Col xs={8}>
                <div className="d-flex justify-content-center">
                  <Calendar
                    className="pb-1 pe-0 mt-0"
                    onChange={onChange}
                    value={value}
                  />
                </div>
              </Col>
              <Col className="mt-2 ps-3">
                <Events />
                <Events />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
      <div className="text-primary fs-5 m-0">Group Details</div>
      <div className="row  mx-1  ">
        <div className="col-2 p-4  pb-1 text-center">Group Name</div>
        <div className="col-8 p-4  pb-1  text-center">Group Topic</div>
        <div className="col-2 p-4 pb-1 text-center"> Topic Status</div>
      </div>
      <div className="row bg-white mx-1 my-4 mt-0 rounded shadow">
        <div className="col-2 p-4  text-center">{groupState?.name}</div>
        <div className="col-8 p-4    text-center">{groupState?.topic}</div>
        <div className="col-2 p-4 text-center">
          <span
            className={`px-4 py-1 rounded text-white ${
              groupState?.topicState === "Declined" && "bg-danger"
            } ${groupState?.topicState === "Accepted" && "bg-success"}  ${
              groupState?.topicState === "Pending" && "bg-warning"
            }  ${groupState?.topicState === "Initial" && "bg-info"}`}
          >
            {groupState?.topicState}
          </span>
        </div>
      </div>

      <div className="row p-3 justify-content-between ">
        {groupState.supervisor?.name && (
          <div className="col-5 mx-1 rounded bg-white py-3 px-3 shadow ">
            <span className="text-primary fs-5">
              Allocated Supervisor Details
            </span>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">Name</div>
                <div className="col-6">{groupState.supervisor?.name}</div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">Email</div>
                <div className="col-6">{groupState.supervisor?.email}</div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">Phone Number</div>
                <div className="col-6">
                  {groupState.supervisor?.contactNumber}
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">faculty</div>
                <div className="col-6">{groupState.supervisor?.faculty}</div>
              </div>
            </div>
          </div>
        )}
        {groupState.cosupervisor?.name && (
          <div className="col-6 mx-1 rounded bg-white py-3 px-3 shadow ">
            <span className="text-primary fs-5">
              Allocated CoSupervisor Details
            </span>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">Name</div>
                <div className="col-6">{groupState.cosupervisor?.name}</div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">Email</div>
                <div className="col-6">{groupState.cosupervisor?.email}</div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">Phone Number</div>
                <div className="col-6">
                  {groupState.cosupervisor?.contactNumber}
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 d-flex">
                <div className="col-6">faculty</div>
                <div className="col-6">{groupState.cosupervisor?.faculty}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {groupState.panelMembers?.length > 0 && (
        <>
          <div className="text-primary fs-5 ps-2 mt-3 mb-1">Panel Members</div>
          <div className="p-3 pb-0 row  my-1 mx-2 rounded">
            <div className="col-3">Name</div>
            <div className="col-3">Email</div>
            <div className="col-3">Phone</div>
            <div className="col-3">Faculty</div>
          </div>
          {groupState.panelMembers &&
            groupState.panelMembers.map((member, id) => {
              return (
                <div className="p-3 row bg-white my-2 mx-2 rounded shadow" key={id}>
                  <div className="col-3">{member.name}</div>
                  <div className="col-3">{member.email}</div>
                  <div className="col-3">{member.contactNumber}</div>
                  <div className="col-3">{member.faculty}</div>
                </div>
              );
            })}
        </>
      )}
    </div>
  ) : (
    <div className="container supervisor-bg-color ">
      <SideNav />
      <div className="fs-3 pt-3 d-flex align-items-center ">
        <MdSpaceDashboard color="#007fff" size={35} />
        <span className="ms-3">Dashboard</span>
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

export default GroupDetails;
