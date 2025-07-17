import { useEffect, useState } from 'react';
import style from './GroupList.module.css';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

function GroupList({groups, category}){
  const navigate = useNavigate();

  return(
    <>
      { groups.map((group)=>(
        <div 
          key={group.id} 
          className={style.groupListBg} 
          onClick={()=>{
            if(category){
              navigate(`/post/${group.id}?category=${category}`)
            } else {
              navigate(`/post/${group.id}`)
            }
          }}
        >
          <span className={style.groupInfo}> {group.createUser} · 조회 {group.hit} · {group.createDate} </span>
          ★☆
          <h5 style={{fontWeight: '600'}}> {group.groupName} </h5>
          <p className={`${style.contentLineClamp}`}> {group.content} </p>
          <span className={style.hashTag}>{group.tag}</span>
        </div>
      ))}
    </>
  )
}

export default GroupList;