import { useState } from 'react';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';

function Main(){

    const [darkMode, setDarkMode] = useState(true); //기본 다크모드
    return (
        <div className={darkMode ? "App dark" : "App light"}>
            <Navbar variant={darkMode ? "dark" : "light"} style={{borderBottom: '1px solid #35393d'}}>
                <Container>
                    <Navbar.Brand>Study Sync</Navbar.Brand>
                    <Nav className="me-auto" style={{gap:'10px'}}>
                        <Nav.Link>홈</Nav.Link>
                        <Nav.Link>내 그룹</Nav.Link>
                        <Nav.Link>마이페이지</Nav.Link>
                    </Nav>
                    <Nav>
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
                    </Nav>
                    <button id="login-btn">로그인</button>
                </Container>
            </Navbar>
        </div>
    )
}

export default Main;