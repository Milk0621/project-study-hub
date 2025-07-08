import { useState } from 'react';
import styles from './Modal.module.css';
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

export default Modal;