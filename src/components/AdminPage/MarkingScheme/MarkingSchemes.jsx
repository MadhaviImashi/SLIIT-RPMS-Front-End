import React from "react";
import { Card } from "react-bootstrap";
import SideNav from "../../../shared/SideNav/SideNav";

const MarkingSchemes = () => {
  return (
    <div>
    <SideNav />
      <div className="container">
        <div className="my-3 fs-3 ">Marking Schemes</div>
        <div className="d-flex justify-content-center">
          <Card className="col-8 shadow p-4" >
            <iframe
              src={"MarkingSchemeEditor.html"}
              height={"500px"}
              width={"100%"}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarkingSchemes;
