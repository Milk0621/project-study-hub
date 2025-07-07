import { useState } from 'react';

import { Form, Navbar, Nav, Container } from 'react-bootstrap';

function Main(){

    const [darkMode, setDarkMode] = useState(true); //기본 다크모드
    return (
        <div className={darkMode ? "App dark" : "App light"}>
            <Navbar variant={darkMode ? "dark" : "light"}>
                <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Features</Nav.Link>
                    <Nav.Link>Pricing</Nav.Link>
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
                </Container>
            </Navbar>
        </div>
    )
}

export default Main;