import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Message from '../Message/Message';

//Request card
const RequestCard = ({ group, topic, description, groupId, reFetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleAccept = () => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/researchGroup/acceptTopic", {
      method: "POST",
      body: JSON.stringify({
        groupId,
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
        if (result.message === "Accepted successfully") {
          setIsMessage(true);
          setIsLoading(false);
          setMessage("Topic accepted successfully");
        } else {
          throw new Error("Failed ! Try again");
        }
      })
      .catch((err) => {
        setIsMessage(true);
        setIsLoading(false);
        setMessage("Topic accept failed");
      });
  };

  const handleReject = () => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/researchGroup/declineTopic", {
      method: "POST",
      body: JSON.stringify({
        groupId,
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
        if (result.message === "Declined successfully") {
          setIsMessage(true);
          setIsLoading(false);
          setMessage("Topic declined successfully");
        } else {
          throw new Error("Failed ! Try again");
        }
      })
      .catch((err) => {
        setIsMessage(true);
        setIsLoading(false);
        setMessage("Topic decline failed");
      });
  };

  return (
    <div>
      {isLoading && <LoadingSpinner/>}
      {<Message
        show={isMessage}
        onHide={(e) => {
          setIsMessage(false);
          reFetch(prev=>!prev);
        }}
        message={message}
        title="Topic Evaluation"
      />}
      <Card
        className="p-3 me-3 my-3 border-0 rounded-5 shadow"
        style={{ width: "20rem", backgroundColor: "white" }}
      >
        <Row className="mb-3">
          <Col>
            <b>Group: {group}</b>
          </Col>
          <Col className="text-end">
            <span className="border border-3 border-warning rounded-pill px-2 py-1 text-warning">
              Pending
            </span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <b>Topic:</b> {topic}
          </Col>
        </Row>
        <Row>
          <Col>
            <b>Description:</b> {description}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-end">
            <Button
              className="me-2 py-1 px-3 btn-danger"
              onClick={handleReject}
            >
              Reject
            </Button>
            <Button className="py-1 px-3 btn-success " onClick={handleAccept}>
              Accept
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RequestCard;
