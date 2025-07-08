import styles from './Header.module.css';
import { useContext, useState } from 'react';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';
import { DarkModeContext } from '../../App';

function Header(){
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const [modalOpen, setModalOpen] = useState(false);
    
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
                <button className={styles.loginBtn} style={{color: darkMode ? "#1c1c1e" : "white"}} onClick={() => setModalOpen(true)}>로그인</button>
            </Container>
        </Navbar>
        { modalOpen && <Modal setModalOpen={setModalOpen} /> }
    </>
    )
}

function Modal({setModalOpen}){
    const [signup, setSignup] = useState(false);
    return(
        <div className={styles.modalBg} onClick={() => setModalOpen(false)}>
            <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
                { signup ? (
                    <>
                        <input type="text" placeholder="아이디" />
                        <input type="password" placeholder="비밀번호" />
                        <input type="password" placeholder="비밀번호 확인" />
                        <input type="text" placeholder="닉네임" />
                        <input type="email" placeholder="이메일" />
                        <p onClick={() => setSignup(false)}>이미 계정이 있으신가요? 로그인</p>
                        <button>회원가입</button>
                    </>
                ) : (
                    <>
                        <input type="text" placeholder="아이디" />
                        <input type="password" placeholder="비밀번호" />
                        <p onClick={() => setSignup(true)}>회원가입</p>
                        <button>로그인</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;