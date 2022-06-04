import React, { useEffect, useState } from "react";
import SideNav from "../../../shared/SideNav/SideNav";
import TableRow from "./TableRow";
import { Card } from "react-bootstrap";
import AllocatePanelModal from "./AllocatePanelModal";
import DetailsModal from "./DetailsModal";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const AllocatePanel = () => {
  const [isLoading, setIsLoading] = useState(null);

  const [allocateModalShow,  setAllocateModalShow] = React.useState(false);
  const [detailsModalShow, setDetailsModal] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [refresh,setRefresh] = useState(false);

  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:4000/api/researchGroup/group-details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("Error retriving data");
        }
      })
      .then((result) => {
        setIsError(true);
        setData(result.researchGroup); 
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message);
        setIsError(true);
        setIsLoading(false)
      });
  }, [refresh]);

  return (
    <div>
      <SideNav />
      <div className="container">
      {isLoading && <LoadingSpinner />}
        <div className="fs-3 my-4 "> Allocate Panel Members </div>
        <div className="d-flex justify-content-center">
          <div className="container px-0">
            <Card className="mb-3">
              <div className=" d-flex text-center  py-3 ">
                <div className="col">Group Name</div>
                <div className="col">P.Member 1</div>
                <div className="col">P.Member 2</div>
                <div className="col">P.Member 3</div>
                <div className="col">View Details</div>
              </div>
            </Card>
            {data &&
              data.map((details, index) => {
                return (
                  <TableRow
                    key={index}
                    index={index}
                    btn={
                      details.panelMembers[0] ? (index)=>{setCurrentIndex(index);setDetailsModal(true)} : (index)=>{setCurrentIndex(index);setAllocateModalShow(true)}  
                    }
                    btnText={details.panelMembers[0] ? "View" : "Assign"}
                    groupName={details.groupName}
                    pmember1={
                      details.panelMembers[0] ? details.panelMembers[0].name : "-"
                    }
                    pmember2={
                      details.panelMembers[1] ? details.panelMembers[1].name : "-"
                    }
                    pmember3={
                      details.panelMembers[2] ? details.panelMembers[2].name : "-"
                    }
                  />
                );
              })}
          </div>
          <AllocatePanelModal
            setRefresh={setRefresh}
            show={allocateModalShow}
            setAllocateModalShow={setAllocateModalShow}
            groupDetails = {data && data[currentIndex]}
            onHide={() =>  setAllocateModalShow(false)}
          />
          <DetailsModal
            data = {data && data[currentIndex]}
            show={detailsModalShow}
            onHide={() => setDetailsModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllocatePanel;
