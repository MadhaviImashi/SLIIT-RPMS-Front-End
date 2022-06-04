import { Col, Row } from "react-bootstrap";

const StudentRow = ({name,id,phone})=>{
    return (
        <div>

            <Row className="px-4 py-3">
                <Col>{id}</Col>
                <Col>{name}</Col>
                <Col className="text-end">{phone}</Col>

            </Row>
            <div className="border border-bottom-1 mx-4"></div>
           
        </div>
    )
}

export default StudentRow;