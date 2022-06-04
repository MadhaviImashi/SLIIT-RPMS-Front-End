import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import ViewSubmissionModal from "./ViewSubmissionModal";

const UserTableRow = ({
  index,
  col1,
  col2,
  col3,
  col4,
  col5,
  noBtn,
  id,
  refresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Card className="text-center my-2">
        <Row className="py-3">
          <Col className="col-3">{col1}</Col>
          <Col className="col-2">{col2}</Col>
          <Col className="maxmin">{col3}</Col>
          <Col className="maxmin">{col4}</Col>
          <Col className="maxmin ps-4">{col5}</Col>
          <Col className="maxmin">
            {noBtn ? (
              ""
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                View
              </button>
            )}
          </Col>
        </Row>
      </Card>

      <ViewSubmissionModal
        show={isModalOpen}
        id={id}
        refresh = {refresh}
        onHide={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserTableRow;
