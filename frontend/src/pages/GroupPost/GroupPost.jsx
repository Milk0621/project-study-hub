import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import style from './GroupPost.module.css';
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useSelector } from "react-redux";

function GroupPost(){
    const user = useSelector((state)=>state.user.user);
    const navigate = useNavigate();
    const { id } = useParams(); // 그룹 ID (URL param)
    const [groupPost, setGroupPost] = useState(); // 그룹 상세 정보
    const [groupJoin, setGroupJoin] = useState(false); // 그룹 참여 여부
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [hasFetched, setHasFetched] = useState(false);

    // 카테고리가 존재하면 카테고리 쿼리 포함하여 홈으로 이동
    const navigateToList = () => {
        navigate(category ? `/?category=${category}` : "/");
    }

    // 컴포넌트 마운트 시 그룹 상세 정보, 조회수 증가, 참여 여부 확인
    useEffect(() => {
        const increaseViewCount = async () => {
            try {
                await api.put(`/groups/${id}/views`); // 또는 POST, PATCH → 백엔드에 따라
                setHasFetched(true);
                console.log("조회수 증가 완료");
            } catch (err) {
                console.error("조회수 증가 실패", err);
            }
        };
        
        const fetchGroup = async () => {
            try{
                const res = await api.get(`/groups/${id}`)
                setGroupPost(res.data);
                console.log("그룹 상세 조회 완료: ", res.data);
            } catch (err) {
                console.error("그룹 상세 조회 실패: ", err);
            }
        }
        
        const fetchCheckJoin = async () => {
            try{
                const res = await api.get(`/groupMembers/checkJoin`,{
                    params: {
                        groupId: id,
                        userId: user.id
                    }
                })
                if (res) setGroupJoin(true);
            } catch (err) {
                if (err.response?.status === 404) {
                    setGroupJoin(false);
                } else {
                    console.error("그룹 참여 여부 확인 중 오류: ". err);
                }
            }
        }

        increaseViewCount();
        fetchGroup();
        if (user) fetchCheckJoin();
    }, [user, id]);
    
    // 그룹 참여 처리 함수
    const fetchJoin = async () => {
        const result = window.confirm('가입하시겠습니까?');
        if(!result) return;

        try{
            await api.post(`/groupMembers/join`,{
                groupId: id,
                userId: user.id
            });
            setGroupJoin(!groupJoin);
            alert("그룹 참여 성공!");
        }catch{
            alert("그룹 참여 실패");
        }
    }

    // 날짜 포맷 (T를 공백으로 변환)
    const formatDate = (date) => date.replace('T', ' ');

    return(
        <div className="wrap">
            <div className={style.groupPostTop}>
                <h4>그룹 상세페이지</h4>
                { !groupJoin &&(
                        user?.id &&(
                            groupPost?.createUser == user.id
                                ? <button>수정</button>
                                : <button onClick={()=>{fetchJoin()}}>참여하기</button>
                    )
                )}
            </div>
            {groupPost && (
                <div className={style.groupPost}>
                    <span className={style.hashTag}>{groupPost.tag}</span>
                    <h3 style={{fontWeight: '600'}}>{groupPost.groupName}</h3>
                    <div className={style.groupInfo}>
                        <div>
                            <p style={{marginBottom:'0'}}>{groupPost.createUser}</p>
                            <span>{formatDate(groupPost.createDate)}</span>
                        </div>
                    </div>
                    <hr />
                    <p style={{whiteSpace: 'pre-line', lineHeight: 1.6}}>{groupPost.content}</p>
                </div>
            )}
            <button className={style.groupBtn} onClick={()=>navigateToList()}>목록으로</button>
        </div>
    )
}

export default GroupPost;