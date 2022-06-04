import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import RequestCard from "./RequestCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import SideNav from "../../shared/SideNav/SideNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Evaluate topic
const EvaluateTopic = () => {
  const [evaluateTopics, setEvaluateTopics] = useState([]);
  const academicStaffId = useSelector((state) => state.login.userID);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/researchGroup/topicsOfPanelMember", {
      method: "POST",
      body: JSON.stringify({
        academicStaffId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("Failed ! Try again");
        }
      })
      .then((result) => {
        if (result.message === "Retrieved successfully") {
          setEvaluateTopics(result.topicSubmissons);
        } else {
          throw new Error("Failed ! Try again");
        }
      })
      .catch((err) => {
      });
  }, [academicStaffId, reFetch]);

  return (
    <div className="container supervisor-bg-color overflow-x-hidden">
      <SideNav />
      <Row className="mt-3">
        <Col className="fs-4">Evaluate Topics</Col>
      </Row>
      {evaluateTopics?.length > 0 && (
        <>
          {evaluateTopics.filter((req) => req.topicState === "Pending").length >
            0 && <Row className="ms-1 mt-4 text-primary">Pending Topics</Row>}
          <PerfectScrollbar style={{ display: "flex" }}>
            {evaluateTopics.map((request, index) => {
              if (request.topicState === "Pending") {
                return (
                  <RequestCard
                    reFetch={setReFetch}
                    groupId={request?._id}
                    group={request.groupName}
                    topic={request.topic}
                    description={request.topicDescription}
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

      <Row className="ms-1 mt-5 text-primary">All Topics</Row>

      <div className="row p-3 pb-1 my-2 rounded">
        <div className="col-1"></div>
        <div className="col-1">Group Name</div>
        <div className="col-6">Description</div>
        <div className="col-2">Group Topic</div>
        <div className="col-2">Status</div>
      </div>
      {evaluateTopics.map((request, index) => (
        <div className="d-flex p-3  my-2 rounded bg-white" key={index}>
          <div className="col-1 ">{index + 1}</div>
          <div className="col-1 ps-1">{request.groupName}</div>
          <div className="col-6 ps-1">{request.topicDescription}</div>
          <div className="col-2 ps-1">{request.topic}</div>
          <div className="col-2">
            <div
              className={`p-1 px-3 ${
                request.topicState === "Pending" && "bg-warning"
              } ${request.topicState === "Accepted" && "bg-success"}
                      ${request.topicState === "Declined" && "bg-danger"}
                      ${request.topicState === "Initial" && "bg-info"}
                       text-white reqest-status-item`}
            >
              {request.topicState}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvaluateTopic;
