import { useState } from 'react';
import styles from './Modal.module.css';
function Modal({setModalOpen}){
    const [signup, setSignup] = useState(false);
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const handleLogin = function(){
        if(!userId || !userPw){
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }else{
            alert('성공!');
            return;
        }
    }

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
                        <input 
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e)=>setUserId(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호" 
                            value={userPw} 
                            onChange={(e)=>setUserPw(e.target.value)}
                        />
                        <p onClick={() => setSignup(true)}>회원가입</p>
                        <button onClick={() => handleLogin()}>로그인</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Modal;