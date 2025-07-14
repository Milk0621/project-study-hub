import { useEffect, useState } from 'react';
import style from './GroupList.module.css';
import api from '../../api/api';

function GroupList(props){

  const [groupList, setGroupList] = useState([]);

  useEffect(()=>{
    const fetchGroups = async () => {
      const res = await api.get('/groups/list');
      setGroupList(res.data);
      console.log(res.data);
    }
    fetchGroups();
  }, [])

  return(
    <>
      { groupList.map((group)=>(
        <div key={group.id} className={style.groupListBg}>
          <span className={style.groupInfo}> {group.createUser} · 조회 {group.hit} · {group.createDate} </span>
          ★☆
          <h5 style={{fontWeight: '600'}}> {group.groupName} </h5>
          <p> {group.content} </p>
          <span className={style.hashTag}>{group.tag}</span>
        </div>
      ))}
    </>
  )
}

export default GroupList;