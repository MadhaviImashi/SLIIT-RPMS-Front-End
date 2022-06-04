import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const TableRow = ({
  index,
  setSubmissionIndex,
  addSubmission,
  btn,
  col1,
  col2,
  col3,
  col4,
  col5,
  deadlineTime,
  allow,
}) => {
 
  return (
    <Card className="py-3 my-2">
      <div className="d-flex text-center ">
        <div className="col-2">{col1}</div>
        <div className="col-2">{col2}</div>
        <div className="col-2">
          {col3}@{deadlineTime}
        </div>
        <div className="col-2">{col4}</div>
        <div className="col-2">
          <Badge bg="secondary" pill>
            {col5}
          </Badge>
        </div>
        <div className="col-2">
          <Button
            disabled={allow? false : true}
            variant="outline-primary"
            className="px-4 fw-bold"
            size="sm"
            onClick={() => {
              setSubmissionIndex(index);
              addSubmission(true);
            }}
          >
            {btn}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TableRow;
