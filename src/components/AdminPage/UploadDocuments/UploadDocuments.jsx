import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SideNav from "../../../shared/SideNav/SideNav";
import UploadDocModal from "./UploadDocModal";
import FloatingButton from "../../FloatingButton/FloatingButton";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

const UploadDocuments = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [refresh, setReferesh] = useState(false);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/admin/templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(" Failed");
        }
      })
      .then((result) => {
        setIsLoading(false);
        setData(result.templates);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [refresh]);

  return (
    <div>
      <SideNav />
      <div className="container">
        <div className="my-3 fs-3 ">Upload Templates</div>
        <div className="my-3 text-primary">Recent Documents</div>
        <div className="d-flex justify-content-center">
          <div className="container px-0">
            <div className="row p-3">
              <div className="col-1"></div>
              <div className="col-3">Document</div>
              <div className="col-2">Uploaded Date</div>
              <div className="col-3">Template Type</div>
              <div className="col-2">View Document</div>
            </div>
            {data &&
              data.map((doc, id) => {
                return (
                  <div className="row p-3 bg-white rounded my-3" id={id}>
                    <div className="col-1 text-center">{id + 1}</div>
                    <div className="col-3">{doc.name}</div>
                    <div className="col-2">{doc.createdAt.slice(0, 10)}</div>
                    <div className="col-3">{doc.type}</div>
                    <div className="col-2">
                      <a href={doc.file} download>
                        <FileDownloadIcon />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          <FloatingButton onClick={(e) => setModalShow(true)} />
          <UploadDocModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setModalShow={setModalShow}
            refresh = {setReferesh}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
