import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteUserModal(props) {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  return (
    <Modal show={props.show} onHide={props.onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Remove User?</Modal.Title>
      </Modal.Header>
      <Modal.Body>This action will remove the user {props.userid}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          onClick={() => {

            fetch(props?.apiUrl, {
              method: "POST",
              body: JSON.stringify({
                [props.userType]: props.userid,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.status !== 500) {
                  return response.json();
                } else {
                  throw new Error("Could not perform the action");
                }
              })
              .then((result) => {
                setError("Deleted Successfully!");
                setIsError(true);
              })
              .catch((err) => {
                setError(err.message);
                setIsError(true);
              });
              props.userdeleted()
              props.onHide();
          }}
        >
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserModal;
