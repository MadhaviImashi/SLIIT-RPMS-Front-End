import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Card, Button } from "react-bootstrap";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import "./UserTableRow.css"

const UserTableRow = ({index,col1,col2,col3,col4,col5,col6, deleteModal, deleteID,updateModal, updateID }) => {
  
  return (
    <div>
      <Card className="text-center my-2">
        <Row className="py-3">
          <Col className="maxmin">{col1}</Col>
          <Col className="maxmin">{col2}</Col>
          <Col className="maxmin">{col3}</Col>
          <Col className="maxmin">{col4}</Col>
          <Col className="maxmin ps-4">{col5}</Col>
          <Col className="maxmin">{col6}</Col>
          <Col className="maxmin">
            <Button className="p-0 me-3 bg-secondary border-0" onClick={()=>{updateID(index); updateModal(true)}}><ModeEditIcon/></Button>
            <Button className="p-0 bg-secondary border-0" onClick={()=>{deleteID(col1); deleteModal(true)}}><PersonRemoveIcon/></Button>
          </Col>
          
        </Row>
      </Card>
    </div>
  );
};

export default UserTableRow;
