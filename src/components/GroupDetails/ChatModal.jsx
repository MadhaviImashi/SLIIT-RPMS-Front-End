import { Button, Modal } from "react-bootstrap";
import GroupChat from "../GroupChat/GroupChat";
const ChatModal = (props) => {
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Group Chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <GroupChat/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
