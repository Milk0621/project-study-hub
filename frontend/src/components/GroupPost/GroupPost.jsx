import { useParams } from "react-router-dom";
import style from './GroupPost.module.css';
import { useEffect, useState } from "react";
import api from "../../api/api";

function GroupPost(){
    const { id } = useParams(); 
    const [groupPost, setGroupPost] = useState();

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await api.get(`/groups/post/${id}`)
            setGroupPost(res.data);
            console.log(res.data);
        }
        fetchGroup();
    }, []);
    
    if (!groupPost) return <div>로딩 중...</div>;

    return(
        <div className={style.wrap}>
            <div className={style.groupPostTop}>
                <h4>그룹 상세페이지</h4>
                <button>목록</button>
            </div>
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
                <p>{groupPost.content}</p>
            </div>

        </div>
    )
}

export default GroupPost;