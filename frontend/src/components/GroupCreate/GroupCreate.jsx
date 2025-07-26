import style from './GroupCreate.module.css';
import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GroupCreate() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    // 입력값 상태 관리
    const [groupName, setGroupName] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [password, setPassword] = useState('');

    // 그룹 생성 요청 처리 함수
    const groupCreate = async () => {
        if(!groupName) alert('그룹명을 입력해주세요.')
        else if(!tag) alert('카테고리를 선택해주세요.')
        else if(!content) alert('소개 내용을 입력해주세요.')
        
        const isPrivate = password.trim() !== '' ? 1 : 0;

        try {
            const res = await api.post('/groups/register', {
                groupName: groupName,
                content: content,
                tag: tag,
                createUser: user.id,
                isPrivate: isPrivate,
                password: password
            });
            alert('그룹 생성 성공');
            navigate('/');
        } catch(err) {
            console.error('그룹 생성 실패', err);
        }
    }

    return(
        <div className="wrap">
            <div className={style.groupCreateTop}>
                <h4 style={{margin: '0'}}>그룹 만들기</h4>
                <button onClick={()=>{groupCreate()}}>작성</button>
            </div>
            <div className={style.groupCreate}>
                <input
                    type="text"
                    placeholder='그룹명(제목)'
                    className={style.title}
                    onChange={(e)=>{setGroupName(e.target.value)}}
                />
                <input
                    type="password"
                    placeholder='비밀번호'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <div className={style.radioBox}>
                    <input type="radio" name="tag" id="radio1" value="취업" onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio1">취업</label>
                    <input type="radio" name="tag" id="radio2" value="학업" onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio2">학업</label>
                    <input type="radio" name="tag" id="radio3" value="자격증" onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio3">자격증</label>
                    <input type="radio" name="tag" id="radio4" value="운동" onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio4">운동</label>
                    <input type="radio" name="tag" id="radio5" value="게임" onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio5">게임</label>
                    <input type="radio" name="tag" id="radio6" value="기타" onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio6">기타</label>
                </div>
                <textarea 
                    className={style.content}
                    placeholder="그룹 소개를 입력하세요."
                    rows="20" 
                    style={{resize: 'none'}}
                    onChange={(e)=>{setContent(e.target.value)}}
                />
            </div>
        </div>
    )
}

export default GroupCreate;