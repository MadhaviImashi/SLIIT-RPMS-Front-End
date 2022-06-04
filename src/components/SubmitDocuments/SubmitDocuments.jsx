import TableRow from "./TableRow";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import SideNav from "../../shared/SideNav/SideNav";
import AddSubmissionModal from "./AddSubmissionModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdDocument } from "react-icons/io";
import ViewSubmissionModal from "./ViewSubmissionModal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SubmitDocuments = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [viewModalShow, setviewModalShow] = React.useState(false);

  const [submittedDocs, setSubmittedDocs] = useState(null);
  const [notSubmittedDocs, setNotSubmittedDocs] = useState(null);

  const [submissionIndex, setSubmissionIndex] = useState(-1);
  const [viewIndex, setViewIndex] = useState(-1);

  const [submitted, setsubmitted] = useState(false);

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  const groupState = useSelector((state) => state.group);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/student/get-not-submitted-docs", {
      method: "POST",
      body: JSON.stringify({
        groupID: groupState.id,
      }),
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
        setNotSubmittedDocs(result.submissions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [submitted]);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:4000/api/student/get-submitted-docs", {
      method: "POST",
      body: JSON.stringify({
        groupID: groupState.id,
      }),
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
        setSubmittedDocs(result.submissions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [submitted]);

  return groupState.id ? (
    <div className="container overflow-x-hidden">
      <SideNav />
      {isLoading && <LoadingSpinner />}
      <div className="fs-3 pt-3 d-flex align-items-center ">
        <IoMdDocument color="#007fff" size={35} />
        <span className="ms-3">Submit Documents</span>
      </div>
      <div className="my-3 text-primary">Previous Submissions</div>
      <div className="container ">
        <Card className="mb-3">
          <div className=" d-flex text-center  py-3 ">
            <div className="col-2">Document Name</div>
            <div className="col-2">Description</div>
            <div className="col-2">Closed On</div>
            <div className="col-2">Word Limit</div>
            <div className="col-2">Grade</div>
            <div className="col-2">Add/View Submission</div>
          </div>
        </Card>
        {notSubmittedDocs &&
          notSubmittedDocs.map((submission, index) => {
            return (
              <TableRow
                allow={
                  groupState.supervisor.id?.length &&
                  groupState.cosupervisor.id?.length &&
                  groupState.panelMembers?.length === 3
                }
                key={index}
                index={index}
                col1={submission.name}
                col2={submission.description}
                col3={submission.deadlineDate}
                deadlineTime={submission.deadlineTime}
                col4={submission.wordLimit}
                col5={"Add submission"}
                setSubmissionIndex={setSubmissionIndex}
                addSubmission={setModalShow}
                btn="Add"
              />
            );
          })}
        {submittedDocs &&
          submittedDocs.map((submission, index) => {
            return (
              <TableRow
                allow={true}
                key={index + "su"}
                index={index}
                col1={submission.name}
                col2={submission.description}
                col3={submission.deadlineDate}
                deadlineTime={submission.deadlineTime}
                col4={submission.wordLimit}
                col5={submission.submissions[0].grade}
                setSubmissionIndex={setViewIndex}
                addSubmission={setviewModalShow}
                btn="View"
              />
            );
          })}
      </div>
      <AddSubmissionModal
        setsubmitted={() => {
          setsubmitted((pre) => !pre);
        }}
        submission={notSubmittedDocs && notSubmittedDocs[submissionIndex]}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />

      <ViewSubmissionModal
        group={groupState.name}
        submission={submittedDocs && submittedDocs[viewIndex]}
        show={viewModalShow}
        onHide={() => {
          setviewModalShow(false);
        }}
      />
    </div>
  ) : (
    <div className="container supervisor-bg-color ">
      <SideNav />
      <div className="fs-3 pt-3 d-flex align-items-center ">
        <IoMdDocument color="#007fff" size={35} />
        <span className="ms-3">Submit Documents</span>
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

export default SubmitDocuments;
