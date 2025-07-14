import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/modalSlice";
import { useNavigate } from "react-router-dom";

function PricateRoute({children}){
    const user = useSelector((state)=>state.user.user);

    const dispath = useDispatch();

    const navigate = useNavigate();

    if(!user) {
        navigate('/');
        dispath(openModal());
        return null;
    }

    return children;
}

export default PricateRoute;