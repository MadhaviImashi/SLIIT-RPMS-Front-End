import { BsFillCloudArrowDownFill } from "react-icons/bs";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";
import SideNav from "../../shared/SideNav/SideNav";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DownloadTemplate = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const groupState = useSelector((state) => state.group);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  return groupState.id ? (
    <div className="request-supervisor-bg-color vh-100">
      {isLoading && <LoadingSpinner />}
      <SideNav />

      <div className="container">
        <div className="fs-3 pt-3 d-flex align-items-center ">
          <BsFillCloudArrowDownFill color="#007fff" size={35} />
          <span className="ms-3">Download Templates</span>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="pt-5 text-blue pb-3">Available Templates</div>
          </div>
        </div>

        <div className="row px-3">
          <div className="row p-3  px-4 ">
            <div className="col-3">Name</div>
            <div className="col-3">Uploaded At</div>
            <div className="col-3">Type</div>
            <div className="col-3 d-flex justify-content-end">Download</div>
          </div>
        </div>

        <div className="row px-3 pt-1">
          {data &&
            data.map((doc, id) => (
              <div className="row p-3 my-2 px-4 bg-white rounded" key={id}>
                <div className="col-3">{doc.name}</div>
                <div className="col-3">{doc.createdAt.slice(0, 10)}</div>
                <div className="col-3">{doc.type}</div>
                <div className="col-3 d-flex justify-content-end">
                  <a href={doc.file} download>
                    <FileDownloadIcon />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="container supervisor-bg-color ">
      <SideNav />
      <div className="fs-3 pt-3 d-flex align-items-center ">
        <BsFillCloudArrowDownFill color="#007fff" size={35} />
        <span className="ms-3">Download Templates</span>
      </div>
      <div
        className="d-flex justify-content-center flex-column align-items-center "
        style={{ height: "80vh" }}
      >
        <div className="col-5 text-center fs-3 py-4">
          Currently You Do Not Have A Group ! 😢
        </div>
        <div className="col-3">
          <button onClick={handleCreateGroup} className="button">
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadTemplate;
