import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    //로그인 상태 확인
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await api.get("/users/info");
                setUser(res.data);
            } catch {
                setUser(null);
            }
        };
        checkLogin();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;