import { useContext, useState } from 'react';
import styles from './Modal.module.css';
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { closeModal } from '../../store/modalSlice';

function Modal(){
    const [signup, setSignup] = useState(false);
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);

    if (!isOpen) return null;

    const handleLogin = async function(){
        //유효성 검사
        if(!userId) alert('아이디를 입력해주세요.');
        else if(!userPw) alert('비밀번호를 입력해주세요.');
        else {
            try {
                const response = await api.post("/users/login",{
                    id: userId,
                    pw: userPw
                });

                const token = response.data.token; //백엔드에서 받은 토큰
                localStorage.setItem('token', token); //로컬 스토리지에 저장

                const userInfo = await api.get("/users/info");
                dispatch(setUser(userInfo.data));

                alert("로그인 성공!");
                dispatch(closeModal());
            } catch(err) {
                alert("아이디 및 비밀번호를 확인해주세요.");
            }
        }
    }
    
    const handleSignup = async function(){
        //정규식
        const idRegex = /^[a-zA-Z0-9]{4,12}$/;
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;

        //유효성 검사
        if(!userId) alert('아이디를 입력해주세요.');
        else if(!userPw) alert('비밀번호를 입력해주세요.');
        else if(!checkPw) alert('비밀번호 확인이 필요합니다.');
        else if(!nickname) alert('닉네임을 입력해주세요.');
        else if(!email) alert('이메일을 입력해주세요.');
        else if(!idRegex.test(userId)) alert('아이디는 영문자와 숫자 조합 4~12자여야 합니다.');
        else if(!pwRegex.test(userPw)) alert('비밀번호는 영문+숫자 포함 8~20자여야 합니다.');
        else if(userPw !== checkPw) alert('비밀번호가 일치하지 않습니다.');
        else if(!nicknameRegex.test(nickname)) alert('닉네임은 특수문자 제외 2~10자여야 합니다.');
        else if(!emailRegex.test(email)) alert('올바른 이메일 형식이 아닙니다.');
        else {
            try {
                const response = await api.post("/users/register",{
                    id: userId,
                    pw: userPw,
                    nickname: nickname,
                    email: email
                });
                alert(response.data); //회원가입 성공
                setUserId('');
                setUserPw('');
                setCheckPw('');
                setNickname('');
                setEmail('');
                setSignup(false);
            } catch(err) {
                alert("회원가입 실패");
            }
        };
    }

    return(
        <div className={styles.modalBg} onClick={() => dispatch(closeModal())}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                { signup ? (
                    <>
                        <input
                            type="text" 
                            placeholder="아이디"
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="비밀번호"
                            value={userPw} 
                            onChange={(e) => setUserPw(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="비밀번호 확인"
                            value={checkPw} 
                            onChange={(e) => setCheckPw(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="닉네임"
                            value={nickname} 
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <input 
                            type="email" 
                            placeholder="이메일" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p onClick={() => setSignup(false)}>이미 계정이 있으신가요? 로그인</p>
                        <button onClick={() => handleSignup()}>회원가입</button>
                    </>
                ) : (
                    <>
                        <input 
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="비밀번호" 
                            value={userPw} 
                            onChange={(e) => setUserPw(e.target.value)}
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