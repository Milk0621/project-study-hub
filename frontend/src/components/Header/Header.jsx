import styles from './Header.module.css';
import { useContext, useState } from 'react';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';
import { DarkModeContext } from '../../App';
import Modal from './../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import { openModal, closeModal } from '../../store/modalSlice';

function Header(){
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    return(
    <>
        <Navbar variant={darkMode ? "dark" : "light"} style={{borderBottom: '1px solid #35393d', fontSize: '1.1rem'}}>
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
                            className="custom-switch"
                            label={darkMode ? "Dark" : "Light"}
                            onClick={()=>{
                                setDarkMode(!darkMode)
                            }}
                        />
                    </Form>
                </Nav>
                {user ? (
                    <button className={styles.loginBtn} style={{color: darkMode ? "#1c1c1e" : "white"}} onClick={() => dispatch(logout())}>로그아웃</button>
                ) : (
                    <button className={styles.loginBtn} style={{color: darkMode ? "#1c1c1e" : "white"}} onClick={() => dispatch(openModal())}>로그인</button>
                )}
            </Container>
        </Navbar>
        { isModalOpen && <Modal /> }
    </>
    )
}

export default Header;