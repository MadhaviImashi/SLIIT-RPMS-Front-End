import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";
import RequestCard from "./RequestCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import ChatModal from '../StaffChat/ChatModal'
import SideNav from "../../shared/SideNav/SideNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Supervisor = () => {
 

  const [supervisorRequests, setSupervisorRequests] = useState([]);
  const supervisorId = useSelector((state) => state.login.userID);
  const [reFetch, setReFetch] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetch(
      "http://localhost:4000/api/acedemicStaff/getSupervisorRequestsOfSupervisor",
      {
        method: "POST",
        body: JSON.stringify({
          supervisorId,
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
  }, [supervisorId, reFetch]);

  const chatHandler = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="container supervisor-bg-color overflow-x-hidden">
      <SideNav />
      <Row className="mt-3">
        <Col className="fs-4">Supervisor Requests</Col>
        {/* <Col className="text-end">Message</Col> */}
        <div className="col-2 d-flex justify-content-end">
        <Button variant="outline-primary" onClick={chatHandler}>
                Chat
              </Button>
        </div>
      </Row>
      {
        <ChatModal
          show={isChatOpen}
          onHide={() => {
            setIsChatOpen(false);
          }}
        />
      }
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
      
    </div>
  );
};

export default Supervisor;
