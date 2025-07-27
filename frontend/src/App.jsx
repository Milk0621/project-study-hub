import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from './api/api';
import Home from './pages/Home/Home';
import GroupPost from './pages/GroupPost/GroupPost';
import MyPage from './pages/MyPage/MyPage';
import MyGroup from './pages/MyGroup/MyGroup';
import Header from './components/Header/Header';
import GroupCreate from './components/GroupCreate/GroupCreate';
import PrivateRoute from './routes/PrivateRoute';
import PageWrapper from './components/common/PageWrapper';
import { AnimatePresence } from "framer-motion";
import { setLoading, setUser } from './store/userSlice';
import GroupStudyCalendar from './pages/GroupStudyCalendar/GroupStudyCalendar';
import MyStudyCalendar from './pages/MyStudyCalendar/MyStudyCalendar';

export const DarkModeContext = createContext();

function App() {

  const location = useLocation();
  const isDarkMode =  useSelector((state) => state.theme.isDarkMode);
  const loading = useSelector((state) => state.user.loading);

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
          dispatch(setLoading(false));
        } finally {
          dispatch(setLoading(false)); // 로딩 완료
        }
      } else {
        dispatch(setLoading(false)); // 토큰 없을 때도 로딩 종료
      }
    };
    fetchUser();
  }, []);


  return (
    <div className={`${isDarkMode ? "App dark" : "App light"} ${!loading ? "visible" : ""}`} >
      <Header />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={ <PageWrapper> <Home /> </PageWrapper> }/>
          <Route path='/groupCreate' element={ 
            <PrivateRoute>
              <PageWrapper> <GroupCreate /> </PageWrapper>
            </PrivateRoute> 
          } />
          <Route path='/:id' element={ <PageWrapper> <GroupPost /> </PageWrapper> } />
          <Route path='/myGroup' element={ 
            <PrivateRoute>
              <PageWrapper> <MyGroup /> </PageWrapper> 
            </PrivateRoute>
          } />
          <Route path='/group/:id' element={
            <PrivateRoute>
              <PageWrapper> <GroupStudyCalendar /> </PageWrapper> 
            </PrivateRoute>
          } />
          <Route path='/myPage' element={
            <PrivateRoute>
              <PageWrapper> <MyPage /> </PageWrapper>
            </PrivateRoute>
          } />
          <Route path='/myPage/myCalendar' element={
            <PrivateRoute>
              <PageWrapper> <MyStudyCalendar /> </PageWrapper>
            </PrivateRoute>
          } />
        </Routes> 
      </AnimatePresence>
    </div>
  );
}

export default App;
