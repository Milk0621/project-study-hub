import styles from './Header.module.css';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';
import Modal from './../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import { openModal, closeModal } from '../../store/modalSlice';
import { toggleDarkMode, setDarkMode } from '../../store/themeSlice';
import { useNavigate, Link } from 'react-router-dom';

function Header(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isModalOpen = useSelector((state) => state.modal.isOpen);
    const isDarkMode =  useSelector((state) => state.theme.isDarkMode);

    return(
    <>
        <Navbar variant={isDarkMode ? "dark" : "light"} style={{borderBottom: '1px solid #35393d', fontSize: '1.1rem', marginBottom: '3rem'}}>
            <Container>
                <Navbar.Brand>Study Sync</Navbar.Brand>
                <Nav className="me-auto" style={{gap:'10px'}}>
                    <Nav.Link as={Link} to="/">홈</Nav.Link>
                    <Nav.Link as={Link} to="/mygroup">내 그룹</Nav.Link>
                    <Nav.Link as={Link} to="/me">마이페이지</Nav.Link>
                </Nav>
                <Nav>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            className="custom-switch"
                            label={isDarkMode ? "Dark" : "Light"}
                            onClick={()=>{
                                dispatch(toggleDarkMode());
                            }}
                        />
                    </Form>
                </Nav>
                {user ? (
                    <button className={styles.loginBtn} style={{color: isDarkMode ? "#1c1c1e" : "white"}} onClick={() => dispatch(logout())}>로그아웃</button>
                ) : (
                    <button className={styles.loginBtn} style={{color: isDarkMode ? "#1c1c1e" : "white"}} onClick={() => dispatch(openModal())}>로그인</button>
                )}
            </Container>
        </Navbar>
        { isModalOpen && <Modal /> }
    </>
    )
}

export default Header;