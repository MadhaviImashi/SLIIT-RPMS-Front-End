import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";

function ViewSubmissionModal(props) {
  const [marks, setMarks] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(props.id);
    fetch("http://localhost:4000/api/acedemicStaff/setPresentaionMarks", {
      method: "POST",
      body: JSON.stringify({
        groupSubmissonId: props.id,
        grade: marks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("Registration Failed ! Try again");
        }
      })
      .then((result) => {
        props.refresh((p) => !p);
      })
      .catch((err) => {
        props.refresh((p) => !p);
      });
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title id="view_submissions">Evaluate Presentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler}>
          <div className="">
            <div className="d-flex">
              <div className="col-3">
                <div className="py-2">Grade</div>
              </div>
              <div className="col-9">
                <div className="py-2">
                  <FormControl
                    type="text"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end pt-2">
              <Button
                type="button"
                variant="outline-primary"
                size="sm"
                className="px-3 fw-bold "
                onClick={props.onHide}
              >
                Close
              </Button>

              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                className="px-3 mx-2 fw-bold "
                onClick={props.onHide}
              >
                Save Marks
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ViewSubmissionModal;
