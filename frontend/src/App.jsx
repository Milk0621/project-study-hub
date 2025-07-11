import './App.css';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import api from './api/api';
import { setUser } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import GroupCreate from './components/GroupCreate/GroupCreate';

export const DarkModeContext = createContext();

function App() {

  const isDarkMode =  useSelector((state) => state.theme.isDarkMode);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

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
    <div className={`${isDarkMode ? "App dark" : "App light"} ${!loading ? "visible" : ""}`} >
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/groupCreate' element={ <GroupCreate /> } />
      </Routes> 
    </div>
  );
}

export default App;
