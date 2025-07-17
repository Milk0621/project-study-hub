import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/modalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({children}){
    const user = useSelector((state)=>state.user.user);

    const dispath = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user) {
            navigate('/');
            dispath(openModal());
        }
    }, [user, navigate, dispath])

    if (!user) return null;
    return children;
}

export default PrivateRoute;