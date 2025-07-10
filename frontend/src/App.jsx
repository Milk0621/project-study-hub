import './App.css';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import {ModalProvider} from './context/ModalContext'
import AuthProvider from './context/AuthContext';

export const DarkModeContext = createContext();

function App() {

  const [darkMode, setDarkMode] = useState(true); //기본 다크모드

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <AuthProvider>
        <ModalProvider>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <Header />
          </DarkModeContext.Provider>
          <Routes>
            <Route path='/' element={ <Home /> }/>
          </Routes> 
        </ModalProvider>  
      </AuthProvider>
    </div>
  );
}

export default App;
