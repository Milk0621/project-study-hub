import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from './api/api';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import GroupCreate from './components/GroupCreate/GroupCreate';
import PrivateRoute from './routes/PrivateRoute';
import GroupPost from './components/GroupPost/GroupPost';
import MyGroup from './components/MyGroup/MyGroup';
import MyPage from './components/MyPage/MyPage';
import PageWrapper from './components/common/PageWrapper';
import { AnimatePresence } from "framer-motion";
import { setLoading, setUser } from './store/userSlice';
import { setScrapList } from './store/scrapSlice';
import StudyCalendar from './components/StudyCalendar/StudyCalendar';

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

    // const fetchScrapList = async () => {
    //   const res = await api.get("/api/groupScrap");
    //   dispatch(setScrapList(res.data));
    // }
    // fetchScrapList();
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
          <Route path='/post/:id' element={ <PageWrapper> <GroupPost /> </PageWrapper> } />
          <Route path='/myGroup' element={ 
            <PrivateRoute>
              <PageWrapper> <MyGroup /> </PageWrapper> 
            </PrivateRoute>
          } />
          <Route path='/group/:id' element={
            <PrivateRoute>
              <PageWrapper> <StudyCalendar /> </PageWrapper> 
            </PrivateRoute>
          } />
          <Route path='/myPage' element={
            <PrivateRoute>
              <PageWrapper> <MyPage /> </PageWrapper>
            </PrivateRoute>
          } />
        </Routes> 
      </AnimatePresence>
    </div>
  );
}

export default App;
