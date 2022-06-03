
import { FaUserGraduate } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GrUserManager } from "react-icons/gr";
import { logout } from "../../reducers/loginSlice";
import { TiGroup } from "react-icons/ti";
import {RiAdminLine} from 'react-icons/ri';
import { MdSupervisorAccount } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import {BsFillCloudArrowDownFill} from "react-icons/bs";
import {MdOutlineSupervisorAccount} from "react-icons/md";
import {HiOutlineUserGroup} from "react-icons/hi";
import {HiOutlineUserAdd} from "react-icons/hi";
import {ImUserTie} from "react-icons/im";
import {HiDocumentDuplicate} from "react-icons/hi";
import "./SideNav.css";
import {clear} from '../../reducers/groupSlice'

const SideNav = () => {
  const loginState = useSelector((state) => state.login);
  const groupState = useSelector((state) => state.group.id);
  const topicState = useSelector((state) => state.group.topicState);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clear());
    localStorage.removeItem("login");
    navigate("/", { replace: true });
  };




  return (
    <div className="sidenav-wrapper">
      <div className="d-flex justify-content-center align-items-center pt-5 fs-4 fw-bold text-white">
        <FaUserGraduate />
        <span className="ps-2 sidenav-display-toggle">RPMS</span>
      </div>
      <div className="d-flex justify-content-center mt-5">
        

        {loginState.type === 'student' && <GrUserManager size={35} color="white"/>}
        {loginState.type === 'admin' && <RiAdminLine size={35} color="white"/>}
        {loginState.type === 'academicStaff' && <RiAdminLine size={35} color="white"/>}
      </div>
      <div className=" justify-content-center pt-3 text-light sidenav-display-toggle">
        {loginState.name}
      </div>

      <div className="p-3 mt-3">
       {loginState.type === 'student' && <>
       <Link to="/group-details" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdSpaceDashboard size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Dashboard</span>
          </div>
        </Link>
       {groupState.length<1 &&  <Link to="/create-group" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <TiGroup size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Create Group</span>
          </div>
        </Link>}

        <Link
          to="/request-supervisor"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdSupervisorAccount size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Request Supervisor</span>
          </div>
        </Link>

        <Link
          to="/request-cosupervisor"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdOutlineSupervisorAccount size={35} />
            </span>
            <span className="side-nav-item-text ms-2">
              Request Co-Supervisor
            </span>
          </div>
        </Link>

        {(topicState === 'Pending' || topicState === 'Accepted' ) ?null:<Link
          to="/submit-topic"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdOutlineSupervisorAccount size={35} />
            </span>
            <span className="side-nav-item-text ms-2">
              Submit Topic
            </span>
          </div>
        </Link>}

        <Link to="/submit-doc" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <IoMdDocument size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Submit Documents</span>
          </div>
        </Link>

        <Link
          to="/download-templates"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <BsFillCloudArrowDownFill size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Download Templates</span>
          </div>
        </Link>
       
       </>}


       {loginState.type === 'admin' && <>
       {/* <Link to="/manage-students" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdSpaceDashboard size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Dashboard</span>
          </div>
        </Link> */}
        <Link to="/manage-students" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2 mt-5">
            <span>
              <HiOutlineUserGroup size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Manage Students</span>
          </div>
        </Link>

        <Link
          to="/manage-staff"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2">
            <span>
              <ImUserTie size={35} />
            </span>
            <span className="side-nav-item-text ms-2">manage Staff</span>
          </div>
        </Link>

        <Link
          to="/allocate-panel"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2">
            <span>
              <HiOutlineUserAdd size={35} />
            </span>
            <span className="side-nav-item-text ms-2">
              Allocate Panel
            </span>
          </div>
        </Link>

        <Link to="/submission-type" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2">
            <span>
              <HiDocumentDuplicate color="white" size={35} className="text-white" />
            </span>
            <span className="side-nav-item-text ms-2">Submition Type</span>
          </div>
        </Link>

        <Link
          to="/upload-templates"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdSpaceDashboard size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Upload Templates</span>
          </div>
        </Link>
       
       </>}



       {loginState.type === 'academicStaff' && <>
       {/* <Link to="/manage-students" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdSpaceDashboard size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Dashboard</span>
          </div>
        </Link> */}
        <Link to="/supervisor" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2 mt-5">
            <span>
              <HiOutlineUserGroup size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Supervisor</span>
          </div>
        </Link>

        <Link
          to="/cosupervisor"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2">
            <span>
              <ImUserTie size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Co-Superviosr</span>
          </div>
        </Link>

        <Link
          to="/evaluate-topics"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex mb-5 align-items-center text-white my-2">
            <span>
            <HiDocumentDuplicate color="white" size={35} className="text-white" />
            </span>
            <span className="side-nav-item-text ms-2">
            Evaluate Topics
            </span>
          </div>
        </Link>

        {/* <Link to="/submission-type" className="text-white text-decoration-none">
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-2">
            <span>
              <HiDocumentDuplicate color="white" size={35} className="text-white" />
            </span>
            <span className="side-nav-item-text ms-2">Submition Type</span>
          </div>
        </Link> */}

        {/* <Link
          to="/download-templates"
          className="text-white text-decoration-none"
        >
          <div className="side-nav-item p-2 d-flex  align-items-center text-white my-1">
            <span>
              <MdSpaceDashboard size={35} />
            </span>
            <span className="side-nav-item-text ms-2">Download Templates</span>
          </div>
        </Link> */}
       
       </>}

        <div
          onClick={logoutHandler}
          className=" side-nav-item p-2 mt-5 d-flex  align-items-center text-white my-1"
        >
          <span>
            <RiLogoutCircleLine size={35} />
          </span>
          <span className="side-nav-item-text ms-2">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
