import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,Button } from "react-bootstrap";
import VerifyAndSave from "./VerifyAndSave";

function DetailsModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="file-input">Panel Allocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VerifyAndSave data={props.data?props.data:[]} btns={false}/>
        <div className="d-flex justify-content-end">
          <Button onClick={()=>{props.onHide()}}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DetailsModal;
