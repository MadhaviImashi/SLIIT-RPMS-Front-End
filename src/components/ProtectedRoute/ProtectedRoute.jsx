import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const isLoggedIn = useSelector(state=>state.login.isLoggedIn);
    

    if(!isLoggedIn){
      return  <Navigate to='/login' replace/>
    }

    return children;
}

export default ProtectedRoute;