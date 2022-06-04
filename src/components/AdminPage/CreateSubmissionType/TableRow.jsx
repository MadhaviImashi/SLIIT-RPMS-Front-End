import React from "react";
import { Card ,Button} from "react-bootstrap";

const TableRow = ({index,setSelectedSubmission,viewSubmission,name,deadline,deadlineTime,wordLimit,maxFileSize,maxFiles,markingScheme}) => {
  return (
    <Card className="py-3 my-2">
      <div className="d-flex text-center ">
        <div className="col-2">{name}</div>
        <div className="col-2">{deadline}@{deadlineTime}</div>
        <div className="col-2">{wordLimit}</div>
        <div className="col-2">{maxFileSize}MBx{maxFiles}Files</div> 
        <div className="col-2"><a href={markingScheme}>Download</a></div> 
        <div className="col-2"><Button variant="outline-primary" className="px-4 fw-bold" size="sm" onClick={()=>{setSelectedSubmission(index);viewSubmission(true)}}>View</Button></div>
      </div>
    </Card>
  );
};

export default TableRow;