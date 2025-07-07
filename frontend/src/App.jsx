import './App.css';
import { createContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main/Main'
import Header from './components/Header/Header'

export const DarkModeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(true); //기본 다크모드
  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <Header />
      </DarkModeContext.Provider>
      <Routes>
        <Route path='/' element={ <Main /> }/>
      </Routes>
    </div>
  );
}

export default App;
