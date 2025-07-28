import style from './GroupForm.module.css';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function GroupForm() {
    const user = useSelector((state) => state.user.user);
    const {id} = useParams(); // 없으면 생성 모드
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    // 입력값 상태 관리
    const [groupName, setGroupName] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(!isEdit) return;
        const fetchGroup = async () => {
            try{
                const res = await api.get(`/groups/${id}`);
                const data = res.data;
                console.log(data);
                setGroupName(data.groupName);
                setContent(data.content);
                setTag(data.tag);
                setPassword(data.password || '');
            } catch (err) {
                console.error('그룹 정보 불러오기 실패', err);
            }
        };
        fetchGroup();
    }, [id])

    const handleSubmit = async () => {
        if(!groupName) alert("그룹명을 작성해주세요.")
        else if(!tag) alert("카테고리를 선택해주세요.")
        else if(!content) alert("그룹 소개 내용을 작성해주세요.");

        const groupData = {
            groupName: groupName,
            content: content,
            tag: tag,
            createUser: user.id,
            isPrivate: password.trim() !== '' ? 1 : 0,
            password: password
        }

        try {
            if (isEdit) {
                await api.put(`/groups/${id}`, {...groupData, id});
                alert("수정 완료");
            } else {
                await api.post('/groups', groupData);
                alert("그룹 생성 완료");
            }
        } catch (err) {
            console.error("작업 실패", err);
        }
    }

    return(
        <div className="wrap">
            <div className={style.groupCreateTop}>
                <h4>{isEdit ? "그룹 수정" : "그룹 만들기"}</h4>
                <button onClick={handleSubmit}>{isEdit ? "수정" : "작성"}</button>
            </div>
            <div className={style.groupCreate}>
                <input
                    type="text"
                    placeholder='그룹명(제목)'
                    className={style.title}
                    value={groupName}
                    onChange={(e)=>{setGroupName(e.target.value)}}
                />
                <input
                    type="password"
                    placeholder='비밀번호'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <div className={style.radioBox}>
                    <input type="radio" name="tag" id="radio1" value="취업" checked={tag === "취업"} onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio1">취업</label>
                    <input type="radio" name="tag" id="radio2" value="학업" checked={tag === "학업"} onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio2">학업</label>
                    <input type="radio" name="tag" id="radio3" value="자격증" checked={tag === "자격증"} onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio3">자격증</label>
                    <input type="radio" name="tag" id="radio4" value="운동" checked={tag === "운동"} onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio4">운동</label>
                    <input type="radio" name="tag" id="radio5" value="게임" checked={tag === "게임"} onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio5">게임</label>
                    <input type="radio" name="tag" id="radio6" value="기타" checked={tag === "기타"} onChange={(e)=>setTag(e.target.value)} />
                    <label htmlFor="radio6">기타</label>
                </div>
                <textarea 
                    className={style.content}
                    placeholder="그룹 소개를 입력하세요."
                    rows="20" 
                    style={{resize: 'none'}}
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                />
            </div>
        </div>
    )
}

export default GroupForm;