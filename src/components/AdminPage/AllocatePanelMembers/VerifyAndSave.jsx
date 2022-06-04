import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const VerifyAndSave = ({
  data,
  activeStep,
  handleBack,
  handleNext,
  steps,
  btns,
}) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const handleFinish = () => {
    setIsLoading(true)
    if (activeStep === steps.length - 1) {
      fetch("http://localhost:4000/api/researchGroup/add-panel", {
        method: "POST",
        body: JSON.stringify({
          groupId: data._id,
          firstPanelMemberId: data.panelMembers[0]._id,
          secondPanelMemberId: data.panelMembers[1]._id,
          thirdPanelMemberId: data.panelMembers[2]._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 500) {
            return response.json();
          } else {
            throw new Error("Allocation Failed ! Try again");
          }
        })
        .then((result) => {
          setError("Allocated Successfully!");
          setIsError(true);
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
          setIsLoading(false)
        });
    }
    handleNext();
  };

  return data ? (
    <div className="ps-2" style={{ height: "25.85rem" }}>
      {isLoading && <LoadingSpinner />}
      <div className="py-3  fs-5 fw-500">Group Details : {data?.groupName}</div>
      <div className="d-flex">
        <div className="col-3">
          <div>Leader</div>
          <div>{data.members[0]?.name}</div>
        </div>
        <div className="col-3">
          <div>Member 1</div>
          <div>{data.members[1]?.name}</div>
        </div>
        <div className="col-3">
          <div>Member 2</div>
          <div>{data.members[2]?.name}</div>
        </div>
        <div className="col-3">
          <div>Member 3</div>
          <div>{data.members[3]?.name}</div>
        </div>
      </div>

      <div className="py-3  fs-5 fw-500">Research Details</div>

      <div className="d-flex">
        <div className="col-6 pe-4">Topic: {data?.topic}</div>
        <div className="col-3">
          <div>Supervisor</div>
          <div>{data.supervisor?.name}</div>
        </div>
        <div className="col-3">
          <div>Co-Supervisor</div>
          <div>{data.cosupervisor?.name}</div>
        </div>
      </div>
      <div className="py-3  fs-5 fw-500">Panel Members</div>
      <div className="d-flex">
        <div className="col-3">
          <div>Member 1</div>
          <div>{data.panelMembers[0] ? data.panelMembers[0].name : "-"}</div>
        </div>
        <div className="col-3">
          <div>Member 2</div>
          <div>{data.panelMembers[1] ? data.panelMembers[1].name : "-"}</div>
        </div>
        <div className="col-3">
          <div>Member 3</div>
          <div>{data.panelMembers[2] ? data.panelMembers[2].name : "-"}</div>
        </div>
      </div>
      {btns && (
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleFinish}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </div>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center fs-3"
      style={{ height: "23.85rem" }}
    >
      <div>Ahh... Snap 😪 something went wrong</div>
    </div>
  );
};

export default VerifyAndSave;
