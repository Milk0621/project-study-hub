import { useSelector } from 'react-redux';
import GroupList from '../../components/GroupList/GroupList';
import style from './MyPage.module.css';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import Calendar from 'react-calendar';

function MyPage(){
    const user = useSelector((state)=>state.user.user);
    const [myScrap, setMyScrap] = useState([]);
    useEffect(()=>{
        const fetchMyScrap = async () => {
            const res = await api.get('/groupScrap/scrapList');
            console.log(res.data);
            setMyScrap(res.data);
        }
        fetchMyScrap();
    }, [])
    return(
        <div className="wrap">
            <h4>내 프로필</h4>
            <div className={style.profile}>
                <p>☺️ 닉네임</p>
                <div className={style.nicknameRow}>
                    {user.nickname}
                    <button className={style.editBtn}>수정</button>
                </div>
                <p>📧 이메일</p>
                <p>{user.email}</p>
                <p>📆 가입날짜</p>
                <p>{user.createdAt}</p>
            </div>
            <h4>내 스크랩</h4>
            <div>
                <GroupList groups={myScrap}/>
            </div>
        </div>
    )
}

export default MyPage;