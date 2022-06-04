import "bootstrap/dist/css/bootstrap.min.css";
import { color } from "./color";

const ChatSend = ({ message, name }) => {
  return (
    <div className="row justify-content-end  py-2">
      <div className="col-8 d-flex flex-column  ">
        <span
          className=" p-1 px-2 d-flex justify-content-end"
          style={{ fontSize: "0.8rem" }}
        >
          {name}
        </span>
        <span className=" rounded p-2 px-2 d-flex justify-content-end">
          <span className="shadow pe-1 p-2 rounded"> {message}</span>
        </span>
      </div>
      <div className="col-2">
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
    </div>
  );
};

export default ChatSend;
