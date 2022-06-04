import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import RequestCard from "./RequestCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import GroupChat from "../GroupChat/GroupChat";
import SideNav from "../../shared/SideNav/SideNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CoSupervisorRequests = () => {
  //dummy messages
  const messages = [
    {
      time: "12:21:2021",
      recepient: "students",
      message: "Hello Students",
    },
    {
      time: "12:21:2021",
      recepient: "supervisor",
      message: "Hello sir",
    },
    {
      time: "12:21:2021",
      recepient: "supervisor",
      message: "When will be the deadline",
    },
    {
      time: "12:21:2021",
      recepient: "students",
      message: "We will inform you",
    },
    {
      time: "12:21:2021",
      recepient: "supervisor",
      message: "Thank you sir",
    },
    {
      time: "12:21:2021",
      recepient: "supervisor",
      message: "Can we have a meeting",
    },
    {
      time: "12:21:2021",
      recepient: "students",
      message: "Of course",
    },
    {
      time: "12:21:2021",
      recepient: "students",
      message: "Let me know the date and time",
    },
    {
      time: "12:21:2021",
      recepient: "supervisor",
      message: "Okay sir",
    },
  ];

  const [supervisorRequests, setSupervisorRequests] = useState([]);
  const coSupervisorId = useSelector((state) => state.login.userID);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost:4000/api/acedemicStaff/getCoSupervisorRequestsOfCoSupervisor",
      {
        method: "POST",
        body: JSON.stringify({
            coSupervisorId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("Failed ! Try again");
        }
      })
      .then((result) => {
        if (result.message === "Requests fetched successfully") {
          setSupervisorRequests(result.requests);
        } else {
          throw new Error("Failed ! Try again");
        }
      })
      .catch((err) => {
      });
  }, [coSupervisorId, reFetch]);

  return (
    <div className="container supervisor-bg-color overflow-x-hidden">
      <SideNav />
      <Row className="mt-3">
        <Col className="fs-4">Co-Supervisor Requests</Col>
        {/* <Col className="text-end">Message</Col> */}
      </Row>
      {supervisorRequests?.length > 0 && (
        <>
          {supervisorRequests.filter(req=>req.status === "Pending").length>0 && <Row className="ms-1 mt-4 text-primary">Pending Requests</Row>}
          <PerfectScrollbar style={{ display: "flex" }}>
            {supervisorRequests.map((request, index) => {
              if (request.status === "Pending") {
                return (
                  <RequestCard
                    reFetch={setReFetch}
                    requestId={request._id}
                    group={request.groupId.groupName}
                    topic={request.topic}
                    description={request.description}
                    key={index}
                  />
                );
              } else {
                return null;
              }
            })}
          </PerfectScrollbar>
        </>
      )}

      <Row className="ms-1 mt-5 text-primary">All Requests</Row>

      <div className="row p-3 pb-1 my-2 rounded">
      <div className="col-1"></div>
        <div className="col-3">Group Name</div>
        <div className="col-3">Domain</div>
        <div className="col-3">Group Topic</div>
        <div className="col-2">Status</div>
      </div>
      {supervisorRequests.map((request, index) => (
        <div className="d-flex p-3  my-2 rounded bg-white" key={index}>
          <div className="col-1 ">{index+1}</div>
          <div className="col-3">{request.groupId.groupName}</div>
          <div className="col-3">{request.domain}</div>
          <div className="col-3">{request.topic}</div>
          <div className="col-2">
            <div
              className={`p-1 px-3 ${
                request.status === "Pending" && "bg-warning"
              } ${request.status === "Accepted" && "bg-success"}
                      ${request.status === "Declined" && "bg-danger"}
                       text-white reqest-status-item`}
            >
              {request.status}
            </div>
          </div>
        </div>
      ))}
      {/* <Row>
        <Col>Chat With Group - A</Col>
      </Row>
      <GroupChat messages={messages} /> */}
    </div>
  );
};

export default CoSupervisorRequests;