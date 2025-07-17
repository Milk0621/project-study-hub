import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import style from './GroupPost.module.css';
import { use, useEffect, useState } from "react";
import api from "../../api/api";
import { useSelector } from "react-redux";

function GroupPost(){
    const user = useSelector((state)=>state.user.user);
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [groupPost, setGroupPost] = useState();
    const [groupJoin, setGroupJoin] = useState(false);

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const navigateToList = () => {
        if(category) {
            navigate(`/?category=${category}`);
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await api.get(`/groups/post/${id}`)
            setGroupPost(res.data);
            console.log(res.data);
        }
        fetchGroup();

        if (!user) return;

        const fetchCheckJoin = async () => {
            try{
                const res = await api.get(`/groupMembers/checkJoin`,{
                    params: {
                        groupId: id,
                        userId: user.id
                    }
                })
                if(res) setGroupJoin(true);
            }catch(err) {
                if (err.response?.status === 404) {
                    setGroupJoin(false);
                } else {
                    console.error("그룹 참여 여부 확인 중 오류". err);
                }
            }
        }
        fetchCheckJoin();
    }, [user, id]);

    const fetchJoin = async () => {
        const result = window.confirm('가입하시겠습니까?');
        if(result){
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
        }else{
            return;
        }
    }

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
                            <span>{groupPost.createDate}</span>
                        </div>
                        <span>★☆</span>
                    </div>
                    <hr />
                    <p style={{whiteSpace: 'pre-line', lineHeight: 1.6}}>{groupPost.content}</p>
                </div>
            )}
            <button onClick={()=>navigateToList()}>목록으로</button>
        </div>
    )
}

export default GroupPost;