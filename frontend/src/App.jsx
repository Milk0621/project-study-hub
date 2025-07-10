import './App.css';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import {ModalProvider} from './context/ModalContext'
import api from './api/axios';
import { setUser } from './store/userSlice';
import { useDispatch } from 'react-redux';

export const DarkModeContext = createContext();

function App() {

  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true); //기본 다크모드
    
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/users/info", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          dispatch(setUser(res.data)); // userSlice의 액션
        } catch (err) {
          console.error("자동 로그인 실패", err);
        } finally {
          setLoading(false); // 로딩 완료
        }
      } else {
        setLoading(false); // 토큰 없을 때도 로딩 종료
      }
    };
    fetchUser();
    setLoading(false);
  }, []);


  return (
    <div className={`${darkMode ? "App dark" : "App light"} ${!loading ? "visible" : ""}`} >
        <ModalProvider>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <Header />
          </DarkModeContext.Provider>
          <Routes>
            <Route path='/' element={ <Home /> }/>
          </Routes> 
        </ModalProvider>  
    </div>
  );
}

export default App;
