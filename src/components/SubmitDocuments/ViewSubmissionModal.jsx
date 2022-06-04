import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Badge } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function ViewSubmissionModal(props) {

  const groupState = useSelector((state) => state.group);
  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title id="view_submissions">View Submission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Submission</div>
            </div>
            <div className="col-9">
              <div className="py-2">{props?.submission?.name}</div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Description</div>
            </div>
            <div className="col-9">
              <div className="py-2">{props?.submission?.description}</div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Student Group</div>
            </div>
            <div className="col-9">
              <div className="py-2">{groupState.name}</div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Status</div>
            </div>
            <div className="col-9 text-success fw-bold">
              <div className="py-2">Submitted on {props?.submission?.submissions[0]?.submittedDate}</div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Close On</div>
            </div>
            <div className="col-9">
              <div className="py-2">{props?.submission?.deadlineDate}</div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Grade</div>
            </div>
            <div className="col-9">
              <div className="py-2">
              <Badge pill>{props?.submission?.submissions[0]?.grade}</Badge>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Note</div>
            </div>
            <div className="col-9">
              <div className="py-2">
                <Form.Control
                  className="mt-2"
                  as="textarea"
                  rows={2}
                  value={props?.submission?.submissions[0]?.note}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="col-3">
              <div className="py-2">Files</div>
            </div>
            <div className="col-9">
              <div className="py-2">
                <div
                  className="border border-1 px-3 py-2"
                  style={{ height: "6rem" }}
                >
                  {props?.submission?.submissions[0]?.documents.map(
                    (doc, index) => {
                      return (
                        <div key={index}>
                          <a key={index} href={doc.file}>{doc.name}</a>
                          <br />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <span>
                    Max {props?.submission?.maxNofFiles} file of{" "}
                    {props?.submission?.maxSubmissionSize}MB
                  </span>
                  <span className="text-danger">
                    *accepted types{" "}
                    {props?.submission?.acceptedFileTypes.map((type,index) => {
                      return <span key={index}>{type} </span>;
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end pt-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="px-3 fw-bold "
              onClick={props.onHide}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ViewSubmissionModal;
