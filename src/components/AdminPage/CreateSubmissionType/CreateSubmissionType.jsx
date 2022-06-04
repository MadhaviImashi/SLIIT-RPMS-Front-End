import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import SideNav from "../../../shared/SideNav/SideNav";
import TableRow from "./TableRow";
import SubmissionTypeModal from "./SubmissionTypeModal";
import ViewSubmissionModal from "./ViewSubmissionModal";
import FloatingButton from "../../FloatingButton/FloatingButton";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const CreateSubmissionTypes = () => {
  const [data, setData] = useState(null);

  const [newSubmission, setNewSubmission] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(-1);
  const [isLoading, setIsLoading] = useState(null);

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/admin/get-submissions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("Error fetching submissions");
        }
      })
      .then((result) => {
        setError("Fetched submissions Successfully!");
        setIsError(true);
        setData(result.submissions);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, [newSubmission]);

  const [modalShow, setModalShow] = React.useState(false);
  const [viewModalShow, setViewModalShow] = React.useState(false);
  return (
    <div>
      <SideNav />
      <div className="container">
      {isLoading && <LoadingSpinner />}
        <div className="my-3 fs-3 ">Create Submissions</div>
        <div className="my-3 text-primary">Recent submission types</div>
        <div className="d-flex justify-content-center">
          <div className="container px-0">
            <Card className="py-3 my-2">
              <div className="d-flex text-center ">
                <div className="col-2">Submission Name</div>
                <div className="col-2">Deadline</div>
                <div className="col-2">Word Limit</div>
                <div className="col-2">Max. File Size/Files</div>
                <div className="col-2">Marking scheme</div>
                <div className="col-2">View Submission</div>
              </div>
            </Card>

            {data &&
              data.map((submission, index) => {
                return (
                  <TableRow
                    key={index}
                    index={index}
                    viewSubmission={setViewModalShow}
                    setSelectedSubmission={setSelectedSubmission}
                    name={submission.name}
                    deadline={submission.deadlineDate}
                    deadlineTime={submission.deadlineTime}
                    wordLimit={submission.wordLimit}
                    maxFileSize={submission.maxSubmissionSize}
                    maxFiles={submission.maxNofFiles}
                    markingScheme={submission.markingScheme}
                  />
                );
              })}
          </div>
          <FloatingButton onClick={(e) => setModalShow(true)} />
          <SubmissionTypeModal
            show={modalShow}
            setNewSubmission={() => {
              setNewSubmission((pre) => !pre);
            }}
            onHide={() => {
              setModalShow(false);
            }}
          />
          {viewModalShow && (
            <ViewSubmissionModal
              show={viewModalShow}
              data={data && data[selectedSubmission]}
              setNewSubmission={() => {
                setNewSubmission((pre) => !pre);
              }}
              onHide={() => {
                setViewModalShow(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSubmissionTypes;
