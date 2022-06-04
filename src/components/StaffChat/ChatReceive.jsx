import "bootstrap/dist/css/bootstrap.min.css";
import { color } from "./color";

const ChatReceive = ({ message, name }) => {
  return (
    <div className="row justify-content-start  py-2">
      <div className="col-1 ">
        <div
          className="d-flex text-white shadow justify-content-center align-items-center fs-5 "
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "3rem",
            backgroundColor: color(name[0]),
          }}
        >
          {name[0]}
        </div>
      </div>
      <div className="col-8 d-flex flex-column">
        <span className=" p-1 px-2" style={{ fontSize: "0.8rem" }}>
          {name}
        </span>
        <span
          className=" rounded p-2 px-2"
          
        >
          <span className="shadow p-2 ps-1">{message}</span>
        </span>
      </div>
    </div>
  );
};

export default ChatReceive;
