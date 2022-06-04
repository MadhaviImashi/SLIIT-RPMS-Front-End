import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import AllocateMembers from "./AllocateMembers";
import VerifyAndSave from "./VerifyAndSave";
import { MdDone } from "react-icons/md";
import {
  Box,
  Stepper,
  Step, 
  StepLabel,
  Button,
} from "@mui/material";

function AllocatePanelModal({show,setAllocateModalShow,setRefresh,groupDetails,onHide}) {

  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    setGroupData(groupDetails);
  }, [groupDetails]);

  const steps = [
    "Choose Student Group",
    "Allocate Panel Members",
    "Finalize Allocation",
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Allocate Panel Members</Modal.Title>
      </Modal.Header>
      <Modal.Body className="allocate-panel-modal-wrap">
        <div className="d-flex justify-content-center">
          <Box sx={{ width: "100%", p: 3 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <div
                  className="d-flex justify-content-center align-items-center fs-2 text-success"
                  style={{ height: "23.75rem" }}
                >
                  Allocation Succeed{" "}
                  <MdDone className="rounded-circle bg-success text-white ms-2" />
                </div>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={()=>{handleReset();setRefresh((prev)=>!prev);setAllocateModalShow(false)}}>Close</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{ maxHeight: "27rem" }}>
                  {
                    {
                      1: (
                        <VerifyAndSave
                          data={groupDetails}
                          activeStep={activeStep}
                          handleBack={handleBack}
                          handleNext={handleNext}
                          steps={steps}
                          btns={true}
                        />
                      ),
                      2: (
                        <AllocateMembers
                          groupDetails={groupData}
                          setGroupData={setGroupData}
                          activeStep={activeStep}
                          handleBack={handleBack}
                          handleNext={handleNext}
                          steps={steps}
                        />
                      ),
                      3: (
                        <VerifyAndSave
                          data={groupData}
                          activeStep={activeStep}
                          handleBack={handleBack}
                          handleNext={handleNext}
                          steps={steps}
                          btns={true}
                        />
                      ),
                    }[activeStep + 1]
                  }
                </div>
              </React.Fragment>
            )}
          </Box>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AllocatePanelModal;
