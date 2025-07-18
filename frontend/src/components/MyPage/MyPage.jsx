import { useSelector } from 'react-redux';
import GroupList from '../GroupList/GroupList';
import style from './MyPage.module.css';

function MyPage(){
    const user = useSelector((state)=>state.user.user);
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
                {/* <GroupList/> */}
            </div>
        </div>
    )
}

export default MyPage;