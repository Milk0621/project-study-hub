import { useNavigate, useParams } from "react-router-dom";
import style from './GroupPost.module.css';
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useSelector } from "react-redux";

function GroupPost(){
    const user = useSelector((state)=>state.user.user);
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [groupPost, setGroupPost] = useState();

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await api.get(`/groups/post/${id}`)
            setGroupPost(res.data);
            console.log(res.data);
        }
        fetchGroup();
    }, []);

    return(
        <div className={style.wrap}>
            <div className={style.groupPostTop}>
                <h4>그룹 상세페이지</h4>
                {user?.id &&(
                    groupPost?.createUser == user.id
                        ? <button>수정</button>
                        : <button>참여하기</button>
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
            <button onClick={()=>navigate('/')}>목록으로</button>
        </div>
    )
}

export default GroupPost;