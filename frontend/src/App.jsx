import './App.css';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [darkMode, setDarkMode] = useState(true); //기본 다크모드
  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label={darkMode ? "Dark" : "Light"}
          onClick={()=>{
            setDarkMode(!darkMode)
          }}
        />
      </Form>
    </div>
  );
}

export default App;
