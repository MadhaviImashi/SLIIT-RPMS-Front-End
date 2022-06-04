import React from "react";

const SearchStudentGroup = ({groupDetails}) => {
  return (
    groupDetails?
    <div style={{ height: "23.85rem" }}>
      <div className="fs-5 fw-bold mt-3">Group Detials</div>
      <div className="d-flex">
        <div className="ps-2 col-6">
          <div className="py-2">Group Name: {groupDetails.groupName}</div>
          <div className="py-2">Group Leader: {groupDetails.members[0].name} </div>
          <div className="py-2">Member 1: {groupDetails.members[1].name} </div>
          <div className="py-2">Member 2: {groupDetails.members[2].name} </div>
          <div className="py-2">Member 3: {groupDetails.members[3].name} </div>
        </div>
        <div className="col-6">
          <div className="py-2">Research Topic: {groupDetails.topic}  </div>
          <div className="py-2">Supervisor: {groupDetails.supervisor.name}</div>
          <div className="py-2">Co-Supervisor: {groupDetails.cosupervisor.name}</div>
        </div>
      </div>
    </div>:
    <div>
      Ahh... Snap 😪 something went wrong
    </div>
  );
};


export default SearchStudentGroup;
