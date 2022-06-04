import React from "react";
import { Card ,Button} from "react-bootstrap";

const TableRow = ({index,groupName,pmember1,pmember2,pmember3,btn,btnText}) => {
  return (
    <Card className="py-3 my-2">
      <div className="d-flex text-center ">
        <div className="col">{groupName}</div>
        <div className="col">{pmember1}</div>
        <div className="col">{pmember2}</div>
        <div className="col">{pmember3}</div> 
        <div className="col"><Button variant="outline-primary" className="px-4 fw-bold" size="sm" onClick={()=>{btn(index)}}>{btnText}</Button></div>
      </div>
    </Card>
  );
};

export default TableRow;