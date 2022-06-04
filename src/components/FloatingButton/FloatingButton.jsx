import { AiOutlinePlus } from "react-icons/ai";
import "./FloatingButton.css";
const FloatingButton = ({ onClick }) => {
  const clickHandler = () => {
    onClick && onClick();
  };

  return (
    <div
      className="floating-btn shadow"
      onClick={clickHandler}
      style={{
        position: "fixed",
        bottom: "5%",
        right: "5%",
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "3.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AiOutlinePlus size={35} color="white" />
    </div>
  );
};

export default FloatingButton;
