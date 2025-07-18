import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/modalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({children}){
    const user = useSelector((state)=>state.user.user);
    const loading = useSelector((state)=>state.user.loading);
    const dispath = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!loading && !user) {
            navigate('/');
            dispath(openModal());
        }
    }, [loading, user, navigate, dispath])
    
    if (loading) return null;
    if (!user) return null;
    return children;
}

export default PrivateRoute;