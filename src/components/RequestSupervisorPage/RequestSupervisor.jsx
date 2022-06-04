import "./RequestSupervisor.css";
import { MdSupervisorAccount } from "react-icons/md";
import FloatingButton from "../FloatingButton/FloatingButton";
import { useEffect, useState } from "react";
import AddRequestModal from "./Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SideNav from "../../shared/SideNav/SideNav";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const RequestSuperVisor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const groupID = useSelector((state) => state.group.id);
  const groupState = useSelector((state) => state.group);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch("http://localhost:4000/api/acedemicStaff/getAllSupervisorRequests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 500) {
          return response.json();
        } else {
          throw new Error("fetch Failed");
        }
      })
      .then((result) => {
        setData(result.requests);
        console.log('supervi', result.requests);
        setIsLoading(false);
        setIsError(false);

      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [isModalOpen]);

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  return groupState.id ? (
    <div className="request-supervisor-bg-color vh-100">
      <SideNav />
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <div className="fs-3 pt-3 d-flex align-items-center ">
          <MdSupervisorAccount color="#007fff" size={35} />
          <span className="ms-3">Request Supervisor</span>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="pt-5 text-blue pb-3">Previous Requests</div>
          </div>
        </div>

        <div className="row px-3 pt-3">
          <div className="col-3 ">Group Name</div>
          <div className="col-2">Supervisor Name</div>
          <div className="col-2">Topic</div>
          <div className="col-3">Domain</div>
          <div className="col-2">Status</div>
        </div>
        {data &&
          !isError &&
          data.map((e, i) => {
            return groupID === e.groupId ? (
              <div className="request-item" key={i}>
                <div className="row">
                  <div className="col-3 ">{groupState.name}</div>
                  <div className="col-2">{e.supervisorId.name}</div>
                  <div className="col-2">{e.topic}</div>
                  <div className="col-3">{e.domain}</div>
                  <div className="col-2">
                    <div
                      className={`p-1 px-3 ${
                        e.status === "Pending" && "bg-warning"
                      } ${e.status === "Accepted" && "bg-success"}
                      ${e.status === "Declined" && "bg-danger"}
                       text-white reqest-status-item`}
                    >
                      {e.status}
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })}
      </div>

      <FloatingButton onClick={(e) => setIsModalOpen(true)} />
      <AddRequestModal
        show={isModalOpen}
        onHide={(e) => setIsModalOpen(false)}
      />
    </div>
  ) : (
    <div className="container supervisor-bg-color ">
      <SideNav />
      <div className="fs-3 pt-3 d-flex align-items-center ">
        <MdSupervisorAccount color="#007fff" size={35} />
        <span className="ms-3">Request Supervisor</span>
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

export default RequestSuperVisor;
