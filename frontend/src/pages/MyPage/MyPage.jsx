import { useDispatch, useSelector } from 'react-redux';
import GroupList from '../../components/GroupList/GroupList';
import style from './MyPage.module.css';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';

function MyPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user.user);
    const [myScrap, setMyScrap] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState(user.nickname); // 초기값 설정
    useEffect(()=>{
        const fetchMyScrap = async () => {
            const res = await api.get('/groupScrap/scrapList');
            console.log(res.data);
            setMyScrap(res.data);
        }
        fetchMyScrap();
    }, [])

    const formatDate = (date) => {
      const formatDate = date.replace('T', ' ');
      return formatDate;
    };

    //닉네임 변경
    const changeNickname = async () => {
        try {
            await api.patch("/users/nickname", { nickname });
            alert("닉네임이 변경되었습니다.");
            
            const res = await api.get("/users/me");
            dispatch(setUser(res.data));
            setIsEditing(false);
        } catch (err) {
            console.error("닉네임 변경 실패", err);
        }
    };

    return(
        <div className="wrap">
            <h4>내 프로필</h4>
            <div className={style.profile}>
                <p>☺️ 닉네임</p>
                <div className={style.nicknameRow}>
                    {isEditing ? (
                        <>
                            <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            />
                            <button onClick={changeNickname} className={style.editBtn}>
                            저장
                            </button>
                        </>
                        ) : (
                        <>
                            <span>{user.nickname}</span>
                            <button
                            className={style.editBtn}
                            onClick={() => {
                                setNickname(user.nickname); // 기존 닉네임 불러오기
                                setIsEditing(true); // 편집 모드로 전환
                            }}
                            >
                            수정
                            </button>
                        </>
                    )}
                </div>
                <p>📧 이메일</p>
                <p>{user.email}</p>
                <p>🕒 가입날짜</p>
                <p>{formatDate(user.createdAt)}</p>
                <p>📆 내 공부기록</p>
                <p onClick={()=>navigate('/me/calendar')} style={{textDecoration: 'underline', cursor: 'pointer', width: '60px'}}>확인하기</p>
            </div>
            <h4>내 스크랩</h4>
            <div>
                <GroupList groups={myScrap} />
            </div>
        </div>
    )
}

export default MyPage;